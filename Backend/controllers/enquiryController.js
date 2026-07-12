const Enquiry = require("../models/Enquiry");

exports.getEnquiries = async(req,res)=>{
    try{
        const enquiries = await Enquiry.find({
            collegeId:req.user._id
        }).sort({updatedAt:-1});
        res.json(enquiries);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.getSingleEnquiry = async(req,res)=>{
    try{
        const enquiry = await Enquiry.findOne({
            _id: req.params.id,
            collegeId:req.user._id
        });
        res.json(enquiry);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};