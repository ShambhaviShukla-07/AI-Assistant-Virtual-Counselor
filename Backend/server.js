const express=require("express");

require("dotenv").config();

const cors = require("cors");
const http= require("http");
const {Server} = require("socket.io");

const connectDB = require("./config/db");
require("node:dns").setServers(["8.8.8.8","8.8.4.4"]);

connectDB();

const app=express();
const server = http.createServer(app);
const io= new Server(server, {
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
});

app.set("io",io);
app.use(
    cors({
        origin:"http://localhost:5173",
        credentials:true
    })
);

app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Admission Whatsapp ERP is Running!!");
});

const authRoutes = require("./routes/authRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const settingRoutes = require("./routes/settingRoutes");
const whatsappRoutes = require("./routes/whatsappRouter");

app.use("/api/auth",authRoutes);
app.use("/api/enquiry",enquiryRoutes);
app.use("/api/setting",settingRoutes);
app.use("/api/whatsapp",whatsappRoutes);

io.on("connection",(socket)=>{
    console.log("Socket Connected",socket.id);

    socket.on("joinCollege", (collegeId)=>{
        socket.join(collegeId);
        console.log("Joined Room", collegeId);
    });

    socket.on("disconnect",()=>{
        console.log("Socket Disconnected", socket.id)
    })
})

const PORT = process.env.PORT || 5001
server.listen(PORT,()=>{
    console.log(`Server Running at PORT ${PORT}`);
})