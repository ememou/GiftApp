const router = require("express").Router();
const {getDonatorData, getOwnerData, getDonators} = require("../handlers/order");
const {auth} = require("../middlewares/auth");

//get wishlist by username
router.get("/getOwnerData/", auth, getOwnerData);
router.get("/getDonatorData/", auth, getDonatorData);

module.exports = router;