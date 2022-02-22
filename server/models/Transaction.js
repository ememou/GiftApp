const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new mongoose.Schema(
    {
        gift: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Gift'
        },
        donator: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        amount:{
            type: Number
        }
    },
    { timestamps: true }
);

module.exports = Transaction =  mongoose.model("Transaction", transactionSchema);