const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required:[true, "Username is required."],
            trim: true
        },
        email: {
            type: String,
            required:[true, "Email is required."],
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required:[true, "Password is required."],
            min: 6,
        },
        profilePic:{
            type: String,
            default: "6203c603d980cb746123d2bc"
        },
        bio:{
            type: String,
            default: "",
            max: 250
        },
        birthDate:{
            type: String,
            default: ""
        },
        gender:{
            type: String,
            default: "",
            enum:["", "Other","Male","Female"]
        },
        friendList: {
            type: [Schema.Types.ObjectId],
            ref: 'User'
        },
        fName: {
            type: String,
            default: ""
        },
        lName: {
            type: String,
            default: ""
        },
        city:{
            type: String,
            default: ""
        },
        country:{
            type: String,
            default: ""
        },
        postalCode:{
            type: String,
            default: ""
        },
        address:{
            type: String,
            default: ""
        },
        ringbell:{
            type: String,
            default: ""
        },
        floor:{
            type: String,
            default: ""
        },
        phone:{
            type: String,
            default: ""
        }
    },
    { timestamps: true }
);

module.exports = User =  mongoose.model("User", userSchema);