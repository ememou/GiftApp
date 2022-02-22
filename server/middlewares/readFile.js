const fs = require("fs");

exports.readFile =  async(req, res, next)=>{
    try {
        const {file} = req;
        
        if(file.mimetype==="application/json"){
            fs.readFile(file.path, 'utf8' , async(err, data) => {
                if (err) return res.status(500).json(err);
                req.newProducts = JSON.parse(data);
                fs.unlink(file.path,function(err){
                    if(err) return res.status(500).json(err);
                    next();
                });
            })
        }
        else return res.status(404).json({msg: "Wrong File Type"});
        
    } catch (err) {
        console.log(err);
        res.status(400).json({msg: "File is not valid"});
    }
}