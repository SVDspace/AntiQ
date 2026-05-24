const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { 
    createQueue,
    getQueues
} = require("../controllers/queueController");

router.post("/", protect, createQueue);
router.get("/", protect, getQueues);

module.exports = router;