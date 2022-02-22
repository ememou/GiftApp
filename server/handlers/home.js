const Product = require("../models/Product");
const Gift = require("../models/Gift");
const User = require("../models/User");
const moment= require('moment')
const {byDate, byTotalAmount} = require("../functions/classification");

const getWishlist = async(_id, tokenUser)=>{
    try {
        const wishlist = await Gift.find({recipient: _id});
        const recipient = await User.findById(_id).select('username profilePic');
        const wishlistData = await Promise.all(wishlist.map(async (w) => {
            const product = await Product.findById(w.product).select('productName imageLink price shippingCost');
            
            let meDonator = false;
            let myDonationAmount = 0;
            let donatedAt = "";
            await Promise.all(w.transactions.map(async (trans) => {
                const transaction = await Transaction.findOne({ $and:
                    [
                        {_id: trans},
                        {donator: tokenUser}
                    ]});
                if(transaction){
                    meDonator=true
                    myDonationAmount=transaction.amount;
                    donatedAt=transaction.updatedAt;
                }
            }));
            return {recipient, product, totalAmount: w.totalAmount, 
                    myDonationAmount: myDonationAmount, donatedAt: moment(donatedAt).format('lll'), 
                    meDonator: meDonator, description: w.description, createdAt: moment(w.createdAt).format('lll'), _id: w._id}
        }));
        return wishlistData;

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

exports.getHomeDate = async(req,res)=>{
    try {
        const user = await User.findById(req.tokenUser.id).select('-password');
        
        const friendsHomeData = []
         await Promise.all(user.friendList.map(async (_id) => {
            const wishlist = await getWishlist(_id, req.tokenUser.id);
            await Promise.all(wishlist.map(async (gift) => {
                friendsHomeData.push(gift);
            }));
            
        }));
        friendsHomeData.sort(byDate);
        res.status(200).json(friendsHomeData);

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

exports.getHomeAmount = async(req,res)=>{
    try {
        const user = await User.findById(req.tokenUser.id).select('-password');
        
        const friendsHomeData = []
         await Promise.all(user.friendList.map(async (_id) => {
            const wishlist = await getWishlist(_id, req.tokenUser.id);
            await Promise.all(wishlist.map(async (gift) => {
                friendsHomeData.push(gift);
            }));
            
        }));
        friendsHomeData.sort(byTotalAmount);
        res.status(200).json(friendsHomeData);

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

exports.searchUsers = async(req,res)=>{
    try {
        if(req.body.data){
            const $regex = new RegExp(req.body.data);
            const users = await User.find({ username: { $regex } });
            
            const usersData = await Promise.all(users.map(async (user) => {
                const weAreFriends = user.friendList.includes(req.tokenUser.id)
                let requestExists = false;
                if(!weAreFriends){
                    requestExists = await FriendRequest.findOne({ $or:
                        [
                            {
                                sender: req.tokenUser.id,
                                recipient: user._id
                            },
                            {
                                sender: user._id,
                                recipient: req.tokenUser.id
                            }
                        ]})
                    if(!requestExists){
                        requestExists=false;
                    }
                }
                return {_id: user._id, username: user.username, profilePic: user.profilePic, weAreFriends: weAreFriends, requestExists: requestExists }
            }));
            res.status(200).json(usersData);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
    
}