const User = require("../models/User");
const FriendRequest = require("../models/FriendRequest");
const Notification = require("../models/Notification");
const {byDate} = require("../functions/classification");

//auth send friend request
exports.sendFriendRequest = async(req,res)=>{
    try {
        const senderId = req.tokenUser.id;
        const recipientId = req.body._id;

        const foundFriendRequest = await FriendRequest.findOne({ $and:
            [
                {sender: senderId},
                {recipient: recipientId}
            ]});/*({
            sender: senderId,
            recipient: recipientId
        });*/
        if(foundFriendRequest){
            return res.status(400).json({msg: 'Already exists'});
        }
        const friendRequest = await FriendRequest.create({
            sender: senderId,
            recipient: recipientId
        });
        res.status(200).json(friendRequest);
    } catch (error) {
        return res.status(500).json({error: error});
    }
};

exports.cancelFriendRequest = async(req, res)=>{
    try{
        const senderId = req.tokenUser.id;
        const recipientId = req.body._id;
        
        await FriendRequest.findOneAndDelete({
            sender: senderId,
            recipient:  recipientId
        });
        return res.status(200).json("Friend Request Canceled");
    } catch (error) {
        return res.status(500).json(error);
    }
};

//get auth friend requests as recipient
exports.getFriendRequests = async(req,res)=>{
    try {
        const requests = await FriendRequest.find({recipient: req.tokenUser.id});
        const countRequest = await FriendRequest.find({recipient: req.tokenUser.id , readed: "false"});
        const requestsData = await Promise.all(requests.map(async (r) => {
            const sender = await User.findById(r.sender).select('username profilePic');
            return {sender, recipient: r.recipient,_id: r._id, updatedAt: r.updatedAt}
        }));
        requestsData.sort(byDate);
        res.status(200).json({requestsData, countRequest: countRequest.length});
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.setReadedRequests = async(req,res)=>{
    try {
        const unreadedRequest = await FriendRequest.find({recipient: req.tokenUser.id , readed: "false"});
        await Promise.all(unreadedRequest.map(async (request) => {        
            request.readed="true"
            request.save();
        }));
        
        res.status(200).json("Readed");
    } catch (error) {
        return res.status(500).json(error);
    }
};

//return true if exists FriendRequest else false
exports.getPendingRequests = async(req,res)=>{
    try{
        const request = await FriendRequest.findOne({ $or:
            [
                {
                    sender: req.tokenUser.id,
                    recipient:  req.body._id
                },
                {
                    sender: req.body._id,
                    recipient: req.tokenUser.id
                }
            ]})
        if(request){
            return res.status(200).json(request);
        }
        return res.status(200).json(false);

    } catch (error) {
        console.log(error)
    }
};

exports.acceptFriendRequest = async(req, res)=>{
    try{
        const senderId = req.body._id;
        const recipientId = req.tokenUser.id;
        
        const request = await FriendRequest.findOne({
            sender: senderId,
            recipient:  recipientId
        });
        
        if(request){
            await User.findOneAndUpdate(
                { _id: senderId, friendList: { $nin: [recipientId] } },
                { $push: { friendList: recipientId } },
                { new: true }
            );

            const addFriendRecipient = await User.findOneAndUpdate(
                { _id: recipientId, friendList: { $nin: [senderId] } },
                { $push: { friendList: senderId } },
                { new: true }
            );
            
            if(addFriendRecipient){
                await FriendRequest.findOneAndDelete({
                    sender: senderId,
                    recipient:  recipientId
                });
            }

            const recipientData = await User.findById(recipientId);

            const senderNotification = new Notification({
                owner: senderId,
                text:`${recipientData.username} accept your friend request!`
            });
            await senderNotification.save();

            return res.status(200).json("Friend Request Accepted");
        }

    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.rejectFriendRequest = async(req, res)=>{
    try{
        const senderId = req.body._id;
        const recipientId = req.tokenUser.id;
        
        await FriendRequest.findOneAndDelete({
            sender: senderId,
            recipient:  recipientId
        });
        return res.status(200).json("Friend Request Rejected");
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.unfriend = async(req, res)=>{
    const userId = req.tokenUser.id;
    const friendId = req.body._id;
    
    const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $pullAll: { friendList: [friendId] } },
        { new: true }
    ).select('-password');
    
    const updatedFriend = await User.findOneAndUpdate(
        { _id: friendId },
        { $pullAll: { friendList: [userId] } },
        { new: true }
    ).select('-password');
    res.status(200).send({ updatedUser, updatedFriend });
}