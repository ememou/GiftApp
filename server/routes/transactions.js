const router = require("express").Router();
const {addMoney, deleteMoney, editMoney, myTransactions} = require("../handlers/transactions");
const {auth} = require("../middlewares/auth");

router.post("/addmoney", auth, addMoney);  

router.post("/deletemoney", auth, deleteMoney);

// add more money
router.post("/editmoney", auth, editMoney);

//transactions auth user
router.get("/mytransactions/", auth, myTransactions);

module.exports = router;