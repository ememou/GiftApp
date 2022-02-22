const Gift = require("../models/Gift");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const Order = require("../models/Order");
const Notification = require("../models/Notification");
//const schedule = require('node-schedule');

exports.orderCompleted = async (gift, product) => {
    try {
        //const product = await Product.findById(gift.product);
        const recipient = await User.findById(gift.recipient);

        const newOrder = new Order({
            owner: {
                ownerId: gift.recipient,
                ownerUsername: recipient.username
            },
            productName: product.productName,
            imageLink: product.imageLink,
            price: product.price,
            shippingCost: product.shippingCost
        });
        newOrder.save();
        //////////////////////////////////////////////////////Oloklhrvsh paraggelias

        await Promise.all(gift.transactions.map(async (transactionId) => {
            const transaction = await Transaction.findById(transactionId);
            const user = await User.findById(transaction.donator);

            //bazoyme ta atoma poy exoyn synisferei
            await Order.findOneAndUpdate(
                { _id: newOrder._id },
                { $push: {
                    members: 
                        {   userId: transaction.donator,
                            username: user.username,
                            amount: transaction.amount,
                            donatedAt: transaction.updatedAt
                        } 
                    }
                },
                { new: true }
            );
            
            const donatorNotification = new Notification({
                owner: transaction.donator,
                text:`${product.productName} completed for ${recipient.username}. Your money have been donated!`
            });
            donatorNotification.save();

            //diagrafoyme to Transaction
            await Transaction.findByIdAndDelete(transactionId);
        }));

        const recipientGiftNotification = new Notification({
            owner: gift.recipient,
            text:`Your wish about ${product.productName} is finally fulfilled. Gongrats ${recipient.username}!`
        });
        recipientGiftNotification.save();
        //to diagrafoume twra
        await Gift.findByIdAndDelete(gift._id);
        //count in stock --
        product.countInSTock = product.countInSTock-1;
        await product.save();
        //if it is out of stock
        if(product.countInSTock <=0){
            const giftsExist = await Gift.find({product: product._id});
            await Promise.all(giftsExist.map(async (giftExist) => {
                const owner = await User.findById(giftExist.recipient);

                const recipientNotification = new Notification({
                    owner: owner._id,
                    text:`${product.productName} deteled from your Wishlist. It is out of stock!`
                });
                await recipientNotification.save();
                
                await Promise.all(giftExist.transactions.map(async (transactionId) => {        
                    const transaction = await Transaction.findById(transactionId);
    
                    const donatorNotification = new Notification({
                        owner: transaction.donator,
                        text:`${product.productName} deteled from the Wishlist of ${owner.username}. Your money have been returned!`
                    });
                    await donatorNotification.save();
                    await Transaction.findByIdAndDelete(transactionId);
                }));
                await Gift.findByIdAndDelete(giftExist._id);
            }));
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
}