const router = require("express").Router();
const { deleteShop, getAuth, editShop, uploadFile, deleteOldProducts} = require("../handlers/shops");
const {authAdmin} = require("../middlewares/authAdmin");
const {readFile} = require("../middlewares/readFile");
const multer = require("multer");
const upload = multer({ dest: 'uploads/' })

//get Auth shop
router.get("/auth", authAdmin, getAuth);

//edit shop
router.post("/edit", authAdmin, editShop);

router.post("/uploadFile", authAdmin ,upload.single('file'), readFile, uploadFile, deleteOldProducts); 

//Delete shop
router.delete("/delete", authAdmin, deleteShop);

module.exports = router;