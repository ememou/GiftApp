const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const giftSchema = new mongoose.Schema(
    {
        recipient: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        product:{
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        },
        description: {
            type: String,
            default: "",
            max: 150
        },
        transactions: {
            type: [Schema.Types.ObjectId],
            ref: 'Transactions'
        },
        totalAmount:{type: Number, default: 0}
    },
    { timestamps: true }
);

module.exports = Gift =  mongoose.model("Gift", giftSchema);