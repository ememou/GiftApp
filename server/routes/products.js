const router = require("express").Router();
const {getProduct, addProductToYourList, deleteProductFromYourList, existToMyList, editGift, getWishlist, getProductsCategory, getCategory, searchProducts} = require("../handlers/products");
const {auth} = require("../middlewares/auth");

// get product by id
router.post("/product/", auth, getProduct);

// add product To Your List
router.post("/addtoyourlist/", auth, addProductToYourList);

//delete from your list
router.post("/deletefromyourlist/", auth, deleteProductFromYourList);

//exist to my list 
router.post("/existtomylist/", auth, existToMyList);

//edit gift
router.post("/editgift/", auth, editGift);

//get wishlist by id
router.post("/getwishlist/", auth, getWishlist);

router.post(`/productsCategory`, auth, getProductsCategory);

router.post(`/category`, auth, getCategory);

router.post("/search/", auth, searchProducts);

module.exports = router;