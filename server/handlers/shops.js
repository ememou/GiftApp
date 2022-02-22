const Shop = require("../models/Shop");
const Product = require("../models/Product");
const Transaction = require("../models/Transaction");
const Notification = require("../models/Notification");
const User = require("../models/User");
const {orderCompleted} = require("../functions/orderCompleted");

const Gift = require("../models/Gift");
const bcrypt = require("bcrypt");

//get Auth Shop
exports.getAuth = async (req, res) => {
    try {
        const shop = await Shop.findById(req.tokenShop.id).select('-password');
        res.status(200).json(shop);
    } catch (error) {
        return res.status(500).json(error);
    }
    
}

exports.editShop = async(req,res)=>{
    try {
        const shop = await Shop.findById(req.tokenShop.id);
        if(shop){
            shop.id =  shop.id;
            
            let exists = await Shop.findOne({brand: req.body.brand});
            if(exists){
                return res.status(400).json({msg: "Brand already exists."});
            }
            shop.brand = req.body.brand || shop.brand;
            
            exists = await Shop.findOne({email: req.body.email});
            if(exists){
                return res.status(400).json({msg: "Email already exists."});
            }
            shop.email = req.body.email || shop.email;

            exists = await Shop.findOne({phone: req.body.phone});
            if(exists){
                return res.status(400).json({msg: "Email already exists."});
            }
            shop.phone = req.body.phone || shop.phone;

            exists = await Shop.findOne({fax: req.body.fax});
            if(exists){
                return res.status(400).json({msg: "Fax already exists."});
            }
            shop.fax = req.body.fax || shop.fax;

            exists = await Shop.findOne({edra: req.body.edra});
            if(exists){
                return res.status(400).json({msg: "Έδρα already exists."});
            }
            shop.edra = req.body.edra || shop.edra;

            exists = await Shop.findOne({afm: req.body.afm});
            if(exists){
                return res.status(400).json({msg: "ΑΦΜ already exists."});
            }
            shop.afm = req.body.afm || shop.afm;

            exists = await Shop.findOne({doy: req.body.doy});
            if(exists){
                return res.status(400).json({msg: "ΔΟΥ already exists."});
            }
            shop.doy = req.body.doy || shop.doy;

            exists = await Shop.findOne({gemh: req.body.gemh});
            if(exists){
                return res.status(400).json({msg: "ΓΕΜΗ already exists."});
            }
            shop.gemh = req.body.gemh || shop.gemh;
            
            if(req.body.password){
                if(req.body.password.length <6){
                    return res.status(400).json({msg: "Password need to be at least 6 characters."});
                }
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
                shop.password = req.body.password || shop.password;
            }

            const updatedShop = await shop.save();
            res.status(200).json("Account has been updated");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

exports.deleteShop = async(req,res)=>{
    try {
        const allProducts = await Product.find({shop: req.tokenShop.id})
        await Promise.all(allProducts.map(async (product) => {
            const giftsExist = await Gift.find({product: product._id});

            await Promise.all(giftsExist.map(async (gift) => {
                const owner = await User.findById(gift.recipient);

                const recipientNotification = new Notification({
                    owner: owner._id,
                    text:`${product.productName} deteled from your Wishlist. It isn't available anymore!`
                });
                await recipientNotification.save();
                
                await Promise.all(gift.transactions.map(async (transactionId) => {        
                    const transaction = await Transaction.findById(transactionId);
    
                    const donatorNotification = new Notification({
                        owner: transaction.donator,
                        text:`${product.productName} deteled from the Wishlist of ${owner.username}. Your money have been returned!`
                    });
                    await donatorNotification.save();
                    await Transaction.findByIdAndDelete(transactionId);
                }));
                await Gift.findByIdAndDelete(gift._id);
            }));
            await Product.findByIdAndDelete(product._id);
        }));
        await Shop.findByIdAndDelete(req.tokenShop.id);
        res.status(200).json("Account has been deleted");
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
}

exports.uploadFile = async(req,res, next)=>{
    try{
        const tokenShop = req.tokenShop.id;
        const {newProducts} = req;
        await Promise.all(newProducts.map(async (p) => {
            const productExists = await Product.findOne(
                {
                    shop: tokenShop,
                    productId: p.productId,
                    productName: p.productName
                }
            );
            if(productExists){
                //updatePrice
                if(productExists.price !== p.price){
                    await updatePrice(productExists, p.price ); 
                }

                productExists.productLink = p.productLink;
                productExists.imageLink = p.imageLink;
                productExists.price = p.price;
                productExists.countInSTock = p.countInSTock;
                productExists.categoryPath = p.categoryPath;
                productExists.manufacturer = p.manufacturer;
                productExists.weight = p.weight;
                productExists.size = p.size;
                productExists.color = p.color;
                productExists.shippingCost = p.shippingCost;
                productExists.description = p.description;
                productExists.updated = "true";

                await productExists.save();
                //console.log("update  " + productExists.updated);
                return {productExists, updated: productExists.updated};
            }
            const newProduct = new Product({
                shop: req.tokenShop.id,
                productId: p.productId,
                productName: p.productName,
                productLink: p.productLink,
                imageLink: p.imageLink,
                price: p.price,
                countInSTock: p.countInSTock,
                categoryPath: p.categoryPath,
                manufacturer: p.manufacturer,
                weight: p.weight,
                size: p.size,
                color: p.color,
                shippingCost: p.shippingCost,
                description: p.description,
                updated: "true"
            });
            await newProduct.save();
            //console.log("save  " + newProduct.updated);
            return {newProduct, updated: newProduct.updated}
            
        }));
        next();
    } catch (err) {
        console.log(err);
        res.status(400).json({msg: "No data for newProducts"});
    }
};

exports.deleteOldProducts = async (req,res) => {
    try {
        const allProducts = await Product.find({shop: req.tokenShop.id})
        await Promise.all(allProducts.map(async (product) => {
            if(product.updated === "false"){
                const giftsExist = await Gift.find({product: product._id});

                await Promise.all(giftsExist.map(async (gift) => {
                    const owner = await User.findById(gift.recipient);

                    const recipientNotification = new Notification({
                        owner: owner._id,
                        text:`${product.productName} deteled from your Wishlist. It isn't available anymore!`
                    });
                    await recipientNotification.save();
                    
                    await Promise.all(gift.transactions.map(async (transactionId) => {        
                        const transaction = await Transaction.findById(transactionId);
        
                        const donatorNotification = new Notification({
                            owner: transaction.donator,
                            text:`${product.productName} deteled from the Wishlist of ${owner.username}. Your money have been returned!`
                        });
                        await donatorNotification.save();
                        await Transaction.findByIdAndDelete(transactionId);
                    }));
                    await Gift.findByIdAndDelete(gift._id);
                }));
                await Product.findByIdAndDelete(product._id);
            }
            else if(product.updated === "true"){
                product.updated="false"
                await product.save();
            }
        }));
        return res.status(200).json("File Uploaded");
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
}

const updatePrice = async (product, newPrice) => {
    try {
        const giftsExist = await Gift.find({product: product._id});                                                                                      
        await Promise.all(giftsExist.map(async (gift) => {
            const owner = await User.findById(gift.recipient);

            if(gift.totalAmount >= (product.price + product.shippingCost)){
                orderCompleted(gift, product);
            }
            else{
                const recipientNotification = new Notification({
                    owner: owner._id,
                    text:`${product.productName}: has been updated (${ parseFloat(parseFloat(newPrice).toFixed(2) - parseFloat(product.price).toFixed(2)).toFixed(2)} €)!`
                });
                await recipientNotification.save();
            }
        }));
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
}