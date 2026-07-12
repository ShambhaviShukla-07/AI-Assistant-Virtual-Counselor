const express = require("express");
const jwt= require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async(req,res,next)=>{
    try{
        const token = req.headers.authorization?.split(" ")[1];

        if(!token){
            return res.status(401).json({
                message:"No Token Available"
            });
        }

        const decoded= jwt.verify(token,process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if(!user){
            return res.status(401).json({
                message:"User Not Found"
            });
        }

        req.user = user;
        next();
    }
    catch(err){
        res.status(401).json({message:"Invalid Token"});
    }
};

module.exports = authMiddleware;