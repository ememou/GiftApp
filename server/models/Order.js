const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema(
    {
        owner: {ownerId: Schema.Types.ObjectId, ownerUsername: String},
        productName:{
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
        shippingCost:{
            type: Number,
            default: 0
        },
        members: [{userId: Schema.Types.ObjectId, username: String, amount: Number, donatedAt: String}]
    },
    { timestamps: true }
);

module.exports = Order =  mongoose.model("Order", orderSchema);