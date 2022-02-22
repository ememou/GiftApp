const Product = require("../models/Product");
const Gift = require("../models/Gift");
const User = require("../models/User");
const moment= require('moment')
const {byDate} = require("../functions/classification");
const Notification = require("../models/Notification");

exports.getProductsCategory = async (req, res) => {
    try{
        
        const categoryProducts = await Product.find({categoryPath: req.body.category});
        //console.log(categoryProducts);
        res.status(200).json(categoryProducts);
    } catch (err) {
        console.log("Error: getAllProducts: " + err);
        res.status(500).json({error: err.message});
    }
}

exports.getCategory = async (req, res) => {
    try{
        const $regex = new RegExp(req.body.category);
        
        const categories = await Product.find({categoryPath: { $regex }}).select('categoryPath -_id');
        
        let categoriesPath = await Promise.all(categories.map(async (category) => {
            let categoryPath = category.categoryPath.split(`${req.body.category}/`);
            if(categoryPath[1]){
                categoryPath = categoryPath[1].split(`/`);
                return `${req.body.category}/${categoryPath[0]}`;
            }
        }))
        categoriesPath = [...new Set(categoriesPath)]
        //console.log(categoriesPath)
        res.status(200).json(categoriesPath);
    } catch (err) {
        console.log("Error: getAllProducts: " + err);
        res.status(500).json({error: err.message});
    }
}

exports.addProductToYourList = async(req,res)=>{
    try{
        //if Gift exists

        const giftExists = await Gift.findOne({ $and:
            [
                {recipient: req.tokenUser.id},
                {product: req.body._id}
            ]});
        if(giftExists){
            return res.status(400).json({error: 'Gift already exists'});
        }
        //else 
        const newGift = new Gift({
            recipient: req.tokenUser.id,
            product: req.body._id,
        });
        newGift.save();
        res.status(200).json(newGift);
    } catch (err) {
        console.log("Error: addToYourList: " + err);
        res.status(500).json({error: err.message});
    }
}

exports.getProduct = async(req,res)=>{
    try{
        const product = await Product.findById(req.body._id);//.select('-password');
        res.status(200).json(product);

    } catch (err) {
        console.log("Error: getProduct: " + err);
        res.status(500).json({error: err.message});
    }
}

exports.deleteProductFromYourList =async(req,res)=>{
    try{
        const giftExists = await Gift.findOne({ $and:
            [
                {recipient: req.tokenUser.id},
                {product: req.body._id}
            ]});
        
        const product = await Product.findById( req.body._id)
        const recipient = await User.findById(req.tokenUser.id);

        if(giftExists){
            //return money from transactions///////////////////////////
            await Promise.all(giftExists.transactions.map(async (transactionId) => {
                const transaction = await Transaction.findById(transactionId);

                const donatorNotification = new Notification({
                    owner: transaction.donator,
                    text:`${product.productName} deleted from ${recipient.username}. Your money have been returned!`
                });
                donatorNotification.save();
                
                //diagrafoyme to Transaction
                await Transaction.findByIdAndDelete(transactionId);
            }));
            await Gift.findOneAndDelete({ $and:
                [
                    {recipient: req.tokenUser.id},
                    {product: req.body._id}
                ]});
            return  res.status(200).json("Gift deleted!");
        }
        res.status(400).json({msg: "Gift doesn't exist"});
        
    } catch (err) {
        console.log("Error: deleteProductFromYourList: " + err);
        res.status(500).json({error: err.message});
    }
}

exports.existToMyList =async(req,res)=>{
    try{
        const giftExists = await Gift.findOne({ $and:
            [
                {recipient: req.tokenUser.id},
                {product: req.body._id}
            ]});

        res.status(200).json(giftExists);

    } catch (err) {
        console.log("Error: existToMyList: " + err);
        res.status(500).json({error: err.message});
    }
}

exports.editGift = async(req,res)=>{
    try {
        const giftExists = await Gift.findOne({ $and:
            [
                {recipient: req.tokenUser.id},
                {product: req.body._id}
            ]});
        if(giftExists){
            giftExists.description =  req.body.description;
           
            const updatedGift = await giftExists.save();
            res.status(200).json(updatedGift);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

//get WishList by id
exports.getWishlist = async(req,res)=>{
    try {
        const wishlist = await Gift.find({recipient: req.body._id});
        const recipient = await User.findById(req.body._id).select('username profilePic');
        const wishlistData = await Promise.all(wishlist.map(async (w) => {
            const product = await Product.findById(w.product).select('productName imageLink price shippingCost');
            
            let meDonator = false;
            let myDonationAmount = 0;
            let donatedAt = "";
            await Promise.all(w.transactions.map(async (trans) => {
                const transaction = await Transaction.findOne({ $and:
                    [
                        {_id: trans},
                        {donator: req.tokenUser.id}
                    ]});
                if(transaction){
                    meDonator=true;
                    myDonationAmount=transaction.amount;
                    donatedAt=transaction.updatedAt;
                }
            }));
            return {recipient, product, totalAmount: w.totalAmount, myDonationAmount: myDonationAmount, 
                    donatedAt: moment(donatedAt).format('lll'), meDonator: meDonator, description: w.description, 
                    createdAt: moment(w.createdAt).format('lll'), _id: w._id}
        }));
        wishlistData.sort(byDate);
        res.status(200).json(wishlistData);

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

exports.searchProducts = async(req,res)=>{
    try {
        if(req.body.data){
            const $regex = new RegExp(req.body.data);
            const products = await Product.find({ productName: { $regex } });
            
            res.status(200).json(products);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
    
}