const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');

module.exports.registerUser = async (req, res) => {
    try{
        let {email,password,fullname} = req.body;
        let user = await userModel.findOne({email : email});
        if(user) return res.status(401).send("User already exists,Please Login");
        bcrypt.genSalt(10 , function(err,salt){
            bcrypt.hash(password, salt ,  async function(err,hash){
                if(err) return res.send(err.message);
                else {
                    let user = await userModel.create({
                        email,
                        password : hash,
                        fullname
                    });
                    let token = generateToken(user);
                    res.cookie('token' , token);
                    res.send("User created successfully");
                    
                }
            })
        })
    }catch(err){    
        console.log(err.message);
    }
}

module.exports.loginUser = async (req, res) => {
    let { email , password } = req.body;

    let user = await userModel.findOne({email : email});
    if(!user) return res.status(401).send("User not found,Please register first");

    bcrypt.compare(password , user.password , function(err,result){
        if(result){
            let token = generateToken(user);
            res.cookie('token' , token);
            res.send("you can login!")
        }else{
            res.send("OOps SOmething went wrong!!!!")
        }
        
    })
}