const express= require("express");
const authMiddleware  = require("../middleware/authMiddleware");
const { getSetting, saveSetting } = require("../controllers/settingController");

const router = express.Router();

router.post("/",authMiddleware,saveSetting);
router.get("/",authMiddleware,getSetting);

module.exports = router;