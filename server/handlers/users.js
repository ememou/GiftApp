const User = require("../models/User");
const FriendRequest = require("../models/FriendRequest");
const Notification = require("../models/Notification");
const bcrypt = require("bcrypt");
const {byDate} = require("../functions/classification");
const moment= require('moment'); 
const Gift = require("../models/Gift");

exports.getAllFriends = async (req, res) => {
    try {
        const user = await User.findById(req.body._id).select('-password');
        const friendList = await Promise.all(user.friendList.map(async (friend) => {
            const friendData = await User.findById(friend).select('username profilePic friendList');
            const weAreFriends = friendData.friendList.includes(req.tokenUser.id)
            let requestExists = false;
            if(!weAreFriends){
                requestExists = await FriendRequest.findOne({ $or:
                    [
                        {
                            sender: req.tokenUser.id,
                            recipient: friendData._id
                        },
                        {
                            sender: friendData._id,
                            recipient: req.tokenUser.id
                        }
                    ]})
                if(!requestExists){
                    requestExists=false;
                }
            }
             return {_id: friendData._id, username: friendData.username, profilePic: friendData.profilePic, weAreFriends: weAreFriends, requestExists: requestExists }
        }));
        res.status(200).json(friendList);
    } catch (error) {
        res.status(500).json(error);
    }
}

//get User By username
exports.getUser = async(req,res)=>{
    try {
        const user = await User.findOne({username: req.params.username}).select('-password');
        res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
}

//get Auth user
exports.getAuth = async (req, res) => {
    try {
        const user = await User.findById(req.tokenUser.id).select('-password');
        res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
    
}

exports.editUser = async(req,res)=>{
    try {
        const user = await User.findById(req.tokenUser.id);
        if(user){
            user.id =  user.id;
            user.gender = req.body.gender || user.gender;
            user.birthDate = req.body.birthDate || user.birthDate;
            user.bio = req.body.bio || user.bio;
            user.fName = req.body.fName || user.fName;
            user.lName = req.body.lName || user.lName;
            user.city = req.body.city || user.city;
            user.country = req.body.country || user.country;
            user.postalCode = req.body.postalCode || user.postalCode;
            user.address = req.body.address || user.address;
            user.ringbell = req.body.ringbell || user.ringbell;
            user.floor = req.body.floor || user.floor;
            user.phone = req.body.phone || user.phone;
            
            if(req.body.password){
                if(req.body.password.length <6){
                    return res.status(400).json({msg: "Password need to be at least 6 characters."});
                }
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
                user.password = req.body.password || user.password;
            }

            const usernameExists = await User.findOne({ $and:
                [
                    {username: req.body.username},
                    {_id: {$ne: req.tokenUser.id}}
                ]
            });
            
            if(usernameExists){
                return res.status(400).json({msg: "Username already exists."});
            }
            user.username = req.body.username || user.username;

            const updatedUser = await user.save();
            res.status(200).json("Account has been updated");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

exports.getNotifications = async(req,res)=>{
    try {
        const notifications = await Notification.find({owner: req.tokenUser.id});
        const countNotifications = await Notification.find({owner: req.tokenUser.id , readed: "false"});
        notifications.sort(byDate);
        res.status(200).json({notifications, countNotifications: countNotifications.length});
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.setReadedNotifications = async(req,res)=>{
    try {
        const unreadedNotifications = await Notification.find({owner: req.tokenUser.id , readed: "false"});
        await Promise.all(unreadedNotifications.map(async (notification) => {        
            notification.readed="true"
            notification.save();
        }));
        
        res.status(200).json("Readed");
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.deleteUser = async(req,res)=>{
    try {
        const user = await User.findById(req.tokenUser.id);

        //delete his gift
        const hisWishlist = await Gift.find({recipient: req.tokenUser.id})

        await Promise.all(hisWishlist.map(async (gift) => {
            const product = await Product.findById(gift.product)
            //delete transactions for his gifts
            await Promise.all(gift.transactions.map(async (transactionId) => {        
                const transaction = await Transaction.findById(transactionId);

                const donatorNotification = new Notification({
                    owner: transaction.donator,
                    text:`${user.username}'s account deleted! ${product.productName} deteled from ${user.username}'s Wishlist. Your money have been returned!`
                });
                await donatorNotification.save();
                await Transaction.findByIdAndDelete(transactionId);
            }));
            await Gift.findByIdAndDelete(gift._id);
        }));
        
        //delete his transactions
        const transactions = await Transaction.find({donator: req.tokenUser.id});

        await Promise.all(transactions.map(async (transaction) => {
            const gift = await Gift.findOne({transactions: { $in : [ transaction._id ]}});
            
            //update gift that he has contribute
            await Gift.findOneAndUpdate(
                { _id: gift._id },
                { $pullAll: { transactions: [transaction._id] }, $inc: {totalAmount: (-parseFloat(transaction.amount).toFixed(2))} }
            );
            await Transaction.findByIdAndDelete(transaction._id);
        }));
        
        
        //delete pending requests 
        await FriendRequest.deleteMany({ sender : req.tokenUser.id });
        await FriendRequest.deleteMany({ recipient : req.tokenUser.id });

        //delete his notifications 
        await Notification.deleteMany( { owner : req.tokenUser.id } );

        //delete userId from his friend's friendlists
        user.friendList.map(async (friendId)=>{
            await User.findOneAndUpdate(
                { _id: friendId },
                { $pullAll: { friendList: [req.tokenUser.id] } },
                { new: true }
            );
        });
        //delete user
        await User.findByIdAndDelete(req.tokenUser.id);

        res.status(200).json("Account has been deleted");
    } catch (error) {
        return res.status(500).json(error);
    }
}