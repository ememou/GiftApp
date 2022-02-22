const router = require("express").Router();
const {getUser, getAuth, editUser, deleteUser, getAllFriends, getNotifications, setReadedNotifications} = require("../handlers/users");
const {auth} = require("../middlewares/auth");

//Delete user
router.delete("/delete", auth, deleteUser);

// get all friends
router.post("/friends", auth, getAllFriends);

//get Auth user
router.get("/auth", auth, getAuth);

//edit User
router.post("/edit", auth, editUser);

router.get("/notifications", auth, getNotifications);
router.get("/setReadedNotifications", auth, setReadedNotifications);

//get user by username
router.get("/:username", auth, getUser);

module.exports = router;