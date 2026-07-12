const Setting= require("../models/Setting");

exports.saveSetting = async (req,res)=>{
    try{
        const collegeId = req.user._id;
        const data = {
            collegeId,
            collegeName:req.body.collegename,
            courses:req.body.courses,
            fees:req.body.fees,
            admissionProcess:req.body.admissionProcess,
            contactInfo:req.body.contactInfo,
            systemPrompt:req.body.systemPrompt
        };

        const setting= await Setting.findByIdAndUpdate(
            {collegeId},
            {data},
            {new:true,upsert:true}
        );
        res.status(201).json({
            message:"Settings Saved",
            setting
        });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
};

exports.getSetting= async(req,res)=>{
    try{
        const setting= await Setting.findOne({collegeId:req.user._id});
        res.json(setting || {});
    }
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }
};

