const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        shop: {
            type: Schema.Types.ObjectId,
            ref: 'Shop'
        },
        productId:{
            type: String,
            default: ""
        },
        productName:{
            type: String,
            default: ""
        },
        productLink:{
            type: String,
            default: ""
        },
        imageLink:{
            type: String,
            default: ""
        },
        price:{
            type: Number,
            default: 0
        },
        countInSTock:{
            type: Number,
            default: 0
        },
        categoryPath:{
            type: String,
            default: ""
        },
        manufacturer:{
            type: String,
            default: ""
        },
        weight:{
            type: String,
            default: ""
        },
        size:{
            type: String,
            default: ""
        },
        color:{
            type: String,
            default: ""
        },
        shippingCost:{
            type: Number,
            default: 0
        },
        description:{
            type: String,
            default: ""
        },
        updated:{
            type: String,
            default: "false"
        }
    }
);

module.exports = Product =  mongoose.model("Product", productSchema);