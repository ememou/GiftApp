require('dotenv').config();
const Shop = require("../models/Shop");
const bcrypt = require("bcrypt");
const {sign} = require("jsonwebtoken");

exports.registerAdmin = async (req, res) => {
    if(!req.body.brand || !req.body.email || !req.body.phone || 
        !req.body.fax || !req.body.edra || !req.body.afm || 
        !req.body.doy || !req.body.gemh || !req.body.password){
        return res.status(400).json({msg: "Please enter all fields"});
    }
    
    if(req.body.password.length < 6){
        return res.status(400).json({msg: "Password need to be at least 6 characters."});
    }
    Shop.findOne({brand: req.body.brand}).then(shop=>{
    if(shop) return res.status(400).json({msg: 'Brand already exists'});
        Shop.findOne({email: req.body.email}).then(shop=>{
            if(shop) return res.status(400).json({msg: 'Email already exists'});
            Shop.findOne({phone: req.body.phone}).then(shop=>{
                if(shop) return res.status(400).json({msg: 'Phone already exists'})
                Shop.findOne({fax: req.body.fax}).then(shop=>{
                    if(shop) return res.status(400).json({msg: 'Fax already exists'})
                    Shop.findOne({edra: req.body.edra}).then(shop=>{
                        if(shop) return res.status(400).json({msg: 'Edra already exists'})
                        Shop.findOne({afm: req.body.afm}).then(shop=>{
                            if(shop) return res.status(400).json({msg: 'AFM already exists'})
                            Shop.findOne({doy: req.body.doy}).then(shop=>{
                                if(shop) return res.status(400).json({msg: 'DOY already exists'})
                                Shop.findOne({gemh: req.body.gemh}).then(shop=>{
                                    if(shop) return res.status(400).json({msg: 'GEMH already exists'})

                                        const newShop = new Shop({
                                            brand: req.body.brand,
                                            email: req.body.email,
                                            phone: req.body.phone,
                                            fax: req.body.fax,
                                            edra: req.body.edra,
                                            afm: req.body.afm,
                                            doy: req.body.doy,
                                            gemh: req.body.gemh,
                                            password: req.body.password
                                        });
                                        bcrypt.genSalt(10, (err,salt)=>{
                                            bcrypt.hash(newShop.password, salt, (err, hash) =>{
                                                if(err) throw err;
                                                newShop.password = hash;
                                                newShop.save()
                                                    .then(shop=>{
                                                        sign({id: shop.id}, process.env.JWT_SECRET_SHOP, (err, token)=>{
                                                            if(err) throw err;
                                                            res.status(200).json({
                                                                token,
                                                                shop: {
                                                                    id: shop.id,
                                                                    brand: shop.brand
                                                                },
                                                                isAdmin: true
                                                            });
                                                        });
                                                    }
                                                );
                                            })
                                        })
                                    }).catch(err=>{
                                        console.log(err)
                                    });
                                }).catch(err=>{
                                    console.log(err)
                                });
                            }).catch(err=>{
                                console.log(err)
                            });
                        }).catch(err=>{
                            console.log(err)
                        });
                    }).catch(err=>{
                        console.log(err)
                    });
                }).catch(err=>{
                    console.log(err)
                });
            }).catch(err=>{
                console.log(err)
            });
    }).catch(err=>{
        console.log(err)
    });
    //if Shop exists
    
                
        
}

exports.loginAdmin = async (req, res) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({msg: "Please enter all fields"});
    }
    
    Shop.findOne({email: req.body.email})
        .then(shop=>{
            if(!shop) return res.status(400).json({msg: 'Email does not exist'});
            //validate password
            bcrypt.compare(req.body.password, shop.password)
                .then(isMatch=>{
                    if(!isMatch) return res.status(400).json({msg: "Incorrect password."});
                    sign({id: shop.id}, process.env.JWT_SECRET_SHOP, (err, token)=>{
                        if(err) throw err;
                        res.status(200).json({
                            token,
                            shop: {
                                id: shop.id,
                                brand: shop.brand
                            },
                            isAdmin: true
                        });
                    });
                }   
            );
        }
    );
}