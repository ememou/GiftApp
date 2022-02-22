const router = require("express").Router();
const {getHomeDate, getHomeAmount, searchUsers} = require("../handlers/home");
const {auth} = require("../middlewares/auth");

//get wishlist by username
router.get("/gethomeDate/", auth, getHomeDate);
router.get("/gethomeAmount/", auth, getHomeAmount);

router.post("/search/", auth, searchUsers);

module.exports = router;