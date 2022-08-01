const UserModel = require("../Model/UserModel");
const bcryptjs = require("bcryptjs");
const repo = require("../Repository/UserRepository");
const jwt = require("jsonwebtoken");
const OtpModel = require("../Model/otpModel")

function GenerateToken(user_id){
    return jwt.sign({user_id}, process.env.SECRET, {expiresIn: "1h"});
}

const RegisterUser = async (req, res)=>{
    const {username, email, password} = req.body;
    try {
        const user = await UserModel.signup(username, email, password)

        // create a token
        const token = GenerateToken(user._id)

        res.status(200).json({email, token})
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const UserLogin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await UserModel.login(email, password);
        // create a token
        const token = GenerateToken(user._id);
        res.status(200).json({status: 200, username: user.username, email, token})
    } catch (error) {
        res.status(400).json({error: error.message})   
    }
}

const PasswordReset = async (req, res)=>{
    let data = await OtpModel.find({email: req.body.email, code: req.body.otpCode});
    if(data){
        let currentTime = new Date().getTime();
        let diff = data.expiresIn - currentTime;
        if(diff < -5){
            res.status(200).json({message: "OTP expired", success: false})
        }else{
            let user = await UserModel.findOne({email: req.body.email});
            user.password = req.body.newPassword;
            user.save();
            res.status(200).json({message: "Password Changed successfully", success: true})
        }
    }
    else{
        res.status(200).json({message: "Invalid OTP", success: false})
    }
    // repo.ResetPassword(req.body.email, req.body.password).then(data=>{
    //     res.status(200).send(data);
    // }).catch((data)=>{
    //     res.send(data);
    // })
}

const SendMail = (req, res)=>{
    repo.SendMail(req.body.email, req.hostname).then(data => {
        console.log(data)
        res.send(data)
    }).catch((data)=>{
        res.send(data);
    })
}



module.exports = { UserLogin, PasswordReset, SendMail, RegisterUser }
