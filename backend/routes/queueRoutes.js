const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { 
    createQueue,
    getQueues,
    getQueueById,
    updateQueue,
    deleteQueue,
} = require("../controllers/queueController");

router.post("/", protect, createQueue);
router.get("/", protect, getQueues);
router.get("/:id", protect, getQueueById);
router.put("/:id",protect,updateQueue);
router.delete("/:id", protect, deleteQueue);

module.exports = router;