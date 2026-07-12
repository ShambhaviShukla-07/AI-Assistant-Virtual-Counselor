const {Client,LocalAuth} = require("whatsapp-web.js");

const Setting = require("../models/Setting");
const Enquiry = require("../models/Enquiry");
const {generateAIReply} = require("./aiService");

const clients ={};

const startWhatsappClient = (collegeId,io) =>{
    if(clients[collegeId]){
        return {
            status: "already_started",
            message: "Whatsapp Client Already Started",
        };
    }

    const client = new Client({
        authStrategy: new LocalAuth({clientId : collegeId}),
        puppeteer : {
            headless:true,
            args:["--no-sandbox","--disable-setuid-sandbox"]
        }
    });

    clients[collegeId] = client;

    client.on("qr", (qr) =>{
        console.log("QR Generated for ",collegeId);
        io.to(collegeId).emit("qr",qr);
    });

    client.on("ready",()=>{
        console.log("Whatsapp Ready for ",collegeId);
        io.to(collegeId).emit("ready",{
            message: "Whatsapp Connected Successfully"
        });
    });

    client.on("authentication",()=>{
        console.log("Whatsapp Authenticated");
        io.to(collegeId).emit("authenticated",{
            message:"Whatsapp Authenticated"
        });
    });

    client.on("disconnected",()=>{
        console.log("Whatsapp Disconnected",collegeId);
        io.to(collegeId).emit("disconnected",{
            message:"Whatsapp Disconnected"
        });
        delete clients[collegeId];
    });

    client.on("disconnected",()=>{
        console.log("Whatsapp Disconnected",collegeId);
        io.to(collegeId).emit("disconnected",{
            message:"Whatsapp Disconnected"
        });
        delete clients[collegeId];
    });

    client.on("message",async (message) => {
        try{
            if(message.from.includes("@g.us"))   //@g.us means it is a group message
                return;
            
            const studentPhone = message.from;
            const studentText = message.body;

            const setting= await Setting.findOne({collegeId});
            if(!setting){
                await message.reply("College Seting Unavailable");
                return
            }
            let enquiry = await Enquiry.findOne({collegeId,stundentPhone});
            if(!enquiry){
                enquiry = await Enquiry.create({
                    collegeId,
                    studentPhone,
                    studentText,
                    message:[]
                })
            }

            enquiry.messages.push({
                sender:"student",
                text: studentText
            });

            let aiReply = await generateAIReply(setting,studentText);
            enquiry.message.push({
                sender:"ai",
                text: aiReply
            });

            enquiry.summary = `Student asked about admission, Latest message : ${studentText}`;

            await enquiry.save();
            await message.reply(aiReply);
        }
        catch(err){
            console.log("Whatsapp Error",err.message);
        }
    });

    client.initialize();
    return {
        status: "Starting",
        message: "Whatsapp Client Starting"
    };
};

module.exports = {startWhatsappClient,clients}