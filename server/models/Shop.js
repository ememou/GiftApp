const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema(
    {
        brand:{
            type: String,
            required:[true, "Brand is required."],
            unique: true
        },
        email: {
            type: String,
            required:[true, "Email is required."],
            unique: true
        },
        phone: {
            type: String,
            required:[true, "Phone is required."]
        },
        fax: {
            type: String,
            required:[true, "Fax is required."]
        },
        edra: {
            type: String,
            required:[true, "Εδρα is required."]
        },
        afm: {
            type: String,
            required:[true, "ΑΦΜ is required."]
        },
        doy: {
            type: String,
            required:[true, "ΔΟΥ is required."]
        },
        gemh: {
            type: String,
            required:[true, "ΓΕΜΗ is required."]
        },
        password: {
            type: String,
            required:[true, "Password is required."]
        },
        shopPic:{
            type: String,
            default: "6203c7e55e961b5f220ffbf6"
        }
    },{ timestamps: true }
);

module.exports = Shop =  mongoose.model("Shop", shopSchema);