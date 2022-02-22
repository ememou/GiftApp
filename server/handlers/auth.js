require('dotenv').config();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const {sign} = require("jsonwebtoken");

exports.register = async (req, res) => {
    
    if(!req.body.username || !req.body.email || !req.body.password){
        return res.status(400).json({msg: "Please enter all fields"});
    }
    
    if(req.body.password.length < 6){
        return res.status(400).json({msg: "Password need to be at least 6 characters."});
    }
    //if User exists
    User.findOne({username: req.body.username})
        .then(user=>{
            if(user) return res.status(400).json({msg: 'Username already exists'});
            User.findOne({email: req.body.email}).then(user=>{
                if(user) return res.status(400).json({msg: 'Email already exists'});
                
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (err,salt)=>{
                    bcrypt.hash(newUser.password, salt, (err, hash) =>{
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user=>{
                                sign({id: user.id}, process.env.JWT_SECRET, (err, token)=>{
                                    if(err) throw err;
                                    res.status(200).json({
                                        token,
                                        user: {
                                            id: user.id,
                                            username: user.username,
                                            email: user.email
                                        },
                                        isAdmin: false
                                    });
                                });
                            }
                        );
                    })
                })
            });
        }
    );
}

exports.login = async (req, res) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({msg: "Please enter all fields"});
    }
    
    User.findOne({email: req.body.email})
        .then(user=>{
            if(!user) return res.status(400).json({msg: 'Email does not exist'});
            //validate password
            bcrypt.compare(req.body.password, user.password)
                .then(isMatch=>{
                    if(!isMatch) return res.status(400).json({msg: "Incorrect password."});
                    sign({id: user.id}, process.env.JWT_SECRET, (err, token)=>{
                        if(err) throw err;
                        res.status(200).json({
                            token,
                            user: {
                                id: user.id,
                                username: user.username,
                                email: user.email
                            },
                            isAdmin: false
                        });
                    });
                }   
            );
        }
    );
}