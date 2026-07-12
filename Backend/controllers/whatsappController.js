const { startWhatsappClient } = require("../services/whatsappService");

exports.connectWhatsapp = async (req,res)=>{
    try{
        const collegeId = req.user._id.toString();
        const io=req.app.get("io");
        const result= startWhatsappClient(collegeId,io);
        res.json(result);
    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}