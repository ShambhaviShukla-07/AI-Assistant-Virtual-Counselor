// to store chatbot conversations

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender:{
        type:String,
        enum:["student","ai"]
    },
    text:String,
    time:{
        type:Date,
        default:Date.now
    }
},{
    _id: false
});

const enquirySchema = new mongoose.Schema({
    collegeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    studentPhone:{
        type:String,
        required:true
    },
    messages:[messageSchema],
    summary:{
        type:String,
        default:""
    },
    leadStatus:{
        type:String,
        enum:["new","intersted","followup","converted","close"],
        default:"new"
    }
},
{timestamps:true});

module.exports = mongoose.model("Enquiry",enquirySchema);