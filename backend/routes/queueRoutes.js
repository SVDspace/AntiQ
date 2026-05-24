const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { 
    createQueue,
    getQueues,
    getQueueById,
    updateQueue,
} = require("../controllers/queueController");

router.post("/", protect, createQueue);
router.get("/", protect, getQueues);
router.put("/:id",protect,updateQueue);

module.exports = router;