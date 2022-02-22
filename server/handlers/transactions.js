const Product = require("../models/Product");
const Gift = require("../models/Gift");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const moment= require('moment') 
const {byDate} = require("../functions/classification");
const {orderCompleted} = require("../functions/orderCompleted");

exports.addMoney = async (req, res) => {
    try{
        const transactionExists = await Transaction.findOne({ $and:
            [
                {donator: req.tokenUser.id},
                {gift: req.body._id}
            ]});
        
        if(transactionExists){
            return res.status(400).json({error: 'Transaction already exists'});
        }
        //else
        const newTransaction = new Transaction({
            donator: req.tokenUser.id,
            gift: req.body._id,
            amount: parseFloat(req.body.value).toFixed(2)
        });
        await newTransaction.save();

        //add Transaction to Gift
        await Gift.findOneAndUpdate(
            { _id: req.body._id, transactions: { $nin: [newTransaction._id] } },
            { $push: { transactions: newTransaction._id }, $inc: {totalAmount: parseFloat(newTransaction.amount).toFixed(2)}}
        );
        
        const gift = await Gift.findById(req.body._id);
        const product = await Product.findById(gift.product);

        if(gift.totalAmount === (product.price + product.shippingCost) || gift.totalAmount >= (product.price + product.shippingCost)){
            orderCompleted(gift, product);
        }
        res.status(200).json(newTransaction);
    } catch (err) {
        console.log("Error: addMoney: " + err);
        res.status(500).json({error: err.message});
    }
}

exports.deleteMoney = async(req,res)=>{
    try{
        //if Transaction exists
        const transactionExists = await Transaction.findOne({ $and:
            [
                {donator: req.tokenUser.id},
                {gift: req.body._id}
            ]});
        
        if(transactionExists){
            await Gift.findOneAndUpdate(
                { _id: req.body._id },
                { $pullAll: { transactions: [transactionExists._id] }, $inc: {totalAmount: (-parseFloat(transactionExists.amount).toFixed(2))} }
            );

            await Transaction.findByIdAndDelete(transactionExists._id);

            return  res.status(200).json("Transaction deleted!");
        }
        res.status(400).json({msg: "Transaction doesn't exist"});

    } catch (err) {
        console.log("Error: deleteMoney: " + err);
        res.status(500).json({error: err.message});
    }
}

exports.editMoney = async(req,res)=>{
    try{

        const transactionExists = await Transaction.findOne({ $and:
            [
                {donator: req.tokenUser.id},
                {gift: req.body._id}
            ]});

        if(transactionExists){
            await Gift.findOneAndUpdate(
                { _id: req.body._id, },
                { $inc: {totalAmount: parseFloat(req.body.value).toFixed(2)}}
            );
            
            await Transaction.findOneAndUpdate(
                { 
                    $and:
                    [
                        {donator: req.tokenUser.id},
                        {gift: req.body._id}
                    ]
                },
                { $inc: {amount: parseFloat(req.body.value).toFixed(2)}}
            );
            
            const gift = await Gift.findById(req.body._id);
            const product = await Product.findById(gift.product);

            if(gift.totalAmount === (product.price + product.shippingCost)){
                orderCompleted(gift, product);
            }
            res.status(200).json("Transaction updated");
        }
    } catch (err) {
        console.log("Error: editMoney: " + err);
        res.status(500).json({error: err.message});
    }
}

exports.myTransactions =async(req,res)=>{
    try{
        const myTransactions = await Transaction.find({donator: req.tokenUser.id});
        
        const transactions = await Promise.all(myTransactions.map(async (trans) => {
            const gift = await Gift.findById(trans.gift);
            const product = await Product.findById(gift.product).select('productName imageLink price shippingCost');
            const recipient = await User.findById(gift.recipient).select('username profilePic');
            
            return {recipient, product, myDonationAmount: trans.amount, donatedAt: moment(trans.updatedAt).format('lll'), 
            totalAmount: gift.totalAmount, description: gift.description, createdAt: moment(gift.createdAt).format('lll'), _id: gift._id}
        }));
        if(transactions){
            await transactions.sort(byDate);
        }
        
        res.status(200).json(transactions);
        
    } catch (err) {
        console.log("Error: myTransactions: " + err);
        res.status(500).json({error: err.message});
    }
}