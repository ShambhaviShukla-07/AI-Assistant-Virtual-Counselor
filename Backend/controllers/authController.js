const bcryptjs= require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (user)=>{
    return jwt.sign(
        {id:user._id, collegeName:user.collegeName},
        process.env.JWT_SECRET,
        {expiresIn:"7d"});
}

const registerUser= async (req,res)=>{
    try{
        const {collegeName,email,password}=req.body;
        if(!collegeName || !email || !password){
            return res.status(400).json({message:"All Fields Required"});
        };

        const existUser = await User.findOne({email});
        if(existUser){
            return res.status(400).json({message:"Email Already Registered"});
        };

        const hashPassword = await bcryptjs.hash(password,10);

        const user= await User.create({
            collegeName,
            email,
            password:hashPassword
        });

        res.status(201).json({
            message:"College Registered",
            token:generateToken(user),
            user:{
                id:user._id,
                collegeName:user.collegeName,
                email:user.email
            }
        });
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

const loginUser= async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                message:"Fill All Fields"
            });
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Wrong Email"});
        }

        const isMatch = await bcryptjs.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Wrong Password"});
        }

        res.status(200).json({
            message:"Login Successful",
            token:generateToken(user),
            user:{
                id:user._id,
                collegeName:user.collegeName,
                email:user.email
            }
        });
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

module.exports= {registerUser,loginUser};