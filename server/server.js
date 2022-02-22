require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDB = require("./config/db");

const authAdminRoutes = require("./routes/authAdmin");
const shopsRoutes = require("./routes/shops");
const imageShopRoutes = require("./routes/imageShop");
const homeRoutes = require("./routes/home");

const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const imageRoutes = require("./routes/image");
const friendRequestRoutes = require("./routes/friendRequests");
const productsRoutes = require("./routes/products");
const transactionsRoutes = require("./routes/transactions");
const orderRoutes = require("./routes/order");
const app = express();

connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", authAdminRoutes);//////////////
app.use("/shop/", shopsRoutes);////////////// ------(delete)
app.use("/imageShop/", imageShopRoutes);//////////////

app.use("/", authRoutes);//////////////
app.use("/user/", friendRequestRoutes);//////////////
app.use("/image/", imageRoutes);//////////////
app.use("/user/", usersRoutes);//////////////
app.use("/product/", productsRoutes);//////////////------check if user add shipping data
app.use("/transactions/", transactionsRoutes);//////////////
app.use("/home/", homeRoutes);//////////////
app.use("/order/", orderRoutes);//////////////

const port = process.env.PORT;

app.listen(port, ()=> console.log("Server starting on port " + port));