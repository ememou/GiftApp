const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");
const moment= require('moment') 
const {byDate} = require("../functions/classification");

exports.getDonatorData = async (req, res) => {
    try{
        const orders = await Order.find({members: {$elemMatch: {userId: req.tokenUser.id}}});
        
        const myDonations = await Promise.all(orders.map(async (order) => {
            let donatorAmount = 0;
            let donatedAt = "";
            await Promise.all(order.members.map(async (donator) => {
                if(donator.userId.toString()===req.tokenUser.id.toString()){
                    donatorAmount = donator.amount;
                    donatedAt = donator.donatedAt;
                }
            }));
            const ownerExist = await User.findById(order.owner.ownerId);
            if(ownerExist){
                return {orderId: order._id, createdAt: moment(order.createdAt).format('lll'), productName: order.productName, 
                        imageLink: order.imageLink, price: order.price, shippingCost: order.shippingCost,
                        amount: donatorAmount, donatedAt: moment(new Date(donatedAt)).format('lll'), ownerUsername: ownerExist.username, ownerImg: ownerExist.profilePic, exist: true};
            }
            else{
                return {orderId: order._id, createdAt: moment(order.createdAt).format('lll'), productName: order.productName, 
                        imageLink: order.imageLink, price: order.price, shippingCost: order.shippingCost,
                        amount: donatorAmount, donatedAt: moment(donatedAt).format('lll'), ownerUsername: order.owner.ownerUsername, ownerImg: "6203c603d980cb746123d2bc", ownerExist: false};
            }
        }));
        if(myDonations){
            myDonations.sort(byDate);
        }
        
        res.status(200).json(myDonations);
        
    } catch (err) {
        console.log("Error: getDonatorData: " + err);
        res.status(500).json({error: err.message});
    }
}

exports.getOwnerData = async (req, res) => {
    try{
        const orders = await Order.find({"owner.ownerId": req.tokenUser.id});
        
        const myDonations = await Promise.all(orders.map(async (order) => {
            const donators = await Promise.all(order.members.map(async (donator) => {
                const donatorExist = await User.findById(donator.userId);
                
                if(donatorExist){
                    const weAreFriends = donatorExist.friendList.includes(req.tokenUser.id)
                    return { userId: donatorExist._id, username: donatorExist.username, img: donatorExist.profilePic, exist: true, weAreFriends: weAreFriends};
                }
                else{
                    return {userId: donator.userId, username: donator.username, img: "6203c603d980cb746123d2bc", exist: false, weAreFriends: false};
                }
            }));

            return {donators, orderId: order._id, createdAt: moment(order.createdAt).format('lll'), productName: order.productName, imageLink: order.imageLink, price: order.price, shippingCost: order.shippingCost};
        }));
        if(myDonations){
            myDonations.sort(byDate);
        }
        
        res.status(200).json(myDonations);
    } catch (err) {
        console.log("Error: getOwnerData: " + err);
        res.status(500).json({error: err.message});
    }
}