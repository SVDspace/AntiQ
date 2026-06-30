const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const admin = require("../middleware/adminMiddleware");

const {
  joinQueue,
  getMyTokens,
  serveNextToken,
  cancelToken,
  getTokenById,
  getQueueHistory,
  getWaitingTokens,
  getEstimatedTime,
  getQueueStats,
  getTokenAnalytics,
} = require("../controllers/tokenController");

router.post("/join/:queueId", protect, joinQueue);
router.get("/my", protect, getMyTokens);
router.get("/stats/:queueId", protect, getQueueStats);
router.put("/serve/:queueId", protect, serveNextToken);
router.put("/cancel/:id", protect, cancelToken);
router.get("/history/:queueId", protect, getQueueHistory);
router.get("/waiting/:queueId", protect, getWaitingTokens);
router.get("/analytics", protect, getTokenAnalytics);
router.get("/:id", protect, getTokenById);

module.exports = router;

