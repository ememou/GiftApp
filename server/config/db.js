require('dotenv').config();
const mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const connectToDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to DB");
    } catch (error) {
        console.log("Error: connectToDB: " + error);
        process.exit(1);
    }
}
module.exports = connectToDB;