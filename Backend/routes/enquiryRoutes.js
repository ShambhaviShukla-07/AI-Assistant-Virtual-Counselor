const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getEnquiries, getSingleEnquiry } = require("../controllers/enquiryController");

router.get("/",authMiddleware,getEnquiries);
router.get("/:id",authMiddleware,getSingleEnquiry);

module.exports = router;