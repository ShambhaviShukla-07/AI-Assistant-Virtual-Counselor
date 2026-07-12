const mongoose= require("mongoose");

const settingSchema = new mongoose.Schema({
    collegeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },
    collegeName:String,
    courses:String,
    fes:String,
    admissionProcess:String,
    contactInfo:String,
    systemPrompt:String
},
{timestamp:true});

module.exports= mongoose.model("Setting",settingSchema);