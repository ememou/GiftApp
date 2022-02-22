const router = require("express").Router();
const mongoose = require("mongoose");
const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");
const path = require("path");
const crypto = require("crypto");
require("dotenv").config();

const Shop = require("../models/Shop");
const {authAdmin} = require("../middlewares/authAdmin");

const conn = mongoose.createConnection(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// Init gfs
let gfs;
conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "imageShops"
  });
});

const storage = new GridFsStorage({
    url: process.env.MONGO_URL,
    options:{useUnifiedTopology: true},
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString("hex") + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: "imageShops",
          };
          resolve(fileInfo);
        });
      });
    },
});

const store = multer({
    storage,
    limits: { fileSize: 20000000 },
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
});

function checkFileType(file, cb){
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname) return cb(null, true);
    cb('filetype');
}

const uploadMiddleware = (req, res, next) =>{
    const upload = store.single('imageShop');
    upload(req, res, function(err){
        if(err instanceof multer.MulterError) return res.status(400).json({msg: "File too large!"});
        else if(err){
            if(err==='filetype')return res.status(400).json({msg: "Image files only"});
            return res.status(500).json({msg: err});
        }
        next();
    });
}

//upload Image
router.post("/upload/", authAdmin, uploadMiddleware, async(req,res)=>{
    const {file} = req;
    const {id} = file;

    if(file.size > 5000000){
        deleteImage(id);
        return res.status(400).json({msg: "file may not exceed 5mb"});
    }
    
    const foundShop = await Shop.findById(req.tokenShop.id);
    if(foundShop.shopPic!=="" && foundShop.shopPic!=="6203c7e55e961b5f220ffbf6"){
        deleteImage(foundShop.shopPic);
    }

    const updatedShop = await Shop.findByIdAndUpdate(req.tokenShop.id, {shopPic: file.id});
    //console.log("upload file: ", file);
    return res.status(200).json(file.id);
});

const deleteImage = id => {
    if(!id || id==='undefined') return res.status(404).json({ msg: "no image id" });
    const _id = mongoose.Types.ObjectId(id);
    gfs.delete(_id, err=>{
        if(err) return res.status(500).json({ msg: "image deletion error" });
    });
}

router.delete("/delete/", authAdmin, async(req,res)=>{
    try {
        const foundShop = await Shop.findById(req.tokenShop.id);
        if(foundShop.shopPic!=="" && foundShop.shopPic!=="6203c7e55e961b5f220ffbf6"){
            deleteImage(foundShop.shopPic);
        }
        return res.status(200).json("Image Deleted");
    } catch (error) {
        console.log(error);
    }
});
//Get Image By Id
router.get("/:id", async(req,res)=>{
    //if(!req.params.id || req.params.id ==='undefined') return res.status(404).json({ msg: "no image id" });
    if(req.params.id && req.params.id !=='undefined'){
        try {
            const _id = mongoose.Types.ObjectId(req.params.id);
            const file = await gfs.find({_id});
            if(!file || file.length ===0) return res.status(400).json({ msg: "no file exist" });
            gfs.openDownloadStream(_id).pipe(res);
        } catch (error) {
            console.log(error);
        }
    }
});

module.exports = router;