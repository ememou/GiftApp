require('dotenv').config();
const {verify} = require("jsonwebtoken");

exports.auth =  async(req, res, next)=>{
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) token = req.headers.authorization.split('Bearer ')[1];
        else return res.status(401).json({msg: 'No token, authorization denied'});

        verify(token, process.env.JWT_SECRET, (error, token)=>{
            if(error) throw error;
            req.tokenUser = token;
            next();
        });
    } catch (err) {
        res.status(400).json({msg: "Token is not valid"});
    }
}

