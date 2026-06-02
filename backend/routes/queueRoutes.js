const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  createQueue,
  getQueues,
  getQueueById,
  updateQueue,
  deleteQueue,
  getQueueStats,
  updateQueueStatus,
  getMyQueues,
  searchQueues,
  getQueueAnalytics,
  reopenQueue,
} = require("../controllers/queueController");

// Create queue
router.post("/", protect, createQueue);

// Get all queues
router.get("/", protect, getQueues);

// Queue stats
router.get("/stats/:id", protect, getQueueStats);

// Reopen queue (Admin only)
router.put("/reopen/:id", protect, admin, reopenQueue);

// Get queue by ID
router.get("/:id", protect, getQueueById);

// Update queue
router.put("/:id", protect, updateQueue);

// Delete queue (Admin only)
router.delete("/:id", protect, admin, deleteQueue);

module.exports = router;