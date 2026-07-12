const express= require("express");
const  authMiddleware  = require("../middleware/authMiddleware");
const { connectWhatsapp } = require("../controllers/whatsappController");
const router = express.Router();

router.post("/connect",authMiddleware,connectWhatsapp);

module.exports= router;