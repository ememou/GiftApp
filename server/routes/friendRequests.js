const router = require("express").Router();
const {sendFriendRequest, cancelFriendRequest, getFriendRequests, getPendingRequests, acceptFriendRequest, rejectFriendRequest, unfriend, setReadedRequests,} = require("../handlers/friendRequests");
const {auth} = require("../middlewares/auth");


router.post("/sendfriendrequest", auth, sendFriendRequest);

router.post("/cancelfriendrequest", auth, cancelFriendRequest);

//get friend request of current user
router.get("/getfriendrequests", auth, getFriendRequests);
router.get("/setReadedRequests", auth, setReadedRequests); 

router.post("/getpendingrequest", auth, getPendingRequests);

router.post('/acceptfriendrequest', auth, acceptFriendRequest);

router.post('/rejectfriendrequest', auth, rejectFriendRequest);

router.post("/unfriend", auth, unfriend);

module.exports = router;