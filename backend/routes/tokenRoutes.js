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
} = require("../controllers/tokenController");

router.post("/:queueId", protect, joinQueue);
router.get("/my", protect, getMyTokens);
router.put("/serve/:queueId", protect, admin, serveNextToken);
router.put("/cancel/:id", protect, cancelToken);
router.get("/history/:queueId", protect, getQueueHistory);
router.get("/waiting/:queueId", protect, getWaitingTokens);
router.get("/:id", protect, getTokenById);

module.exports = router;

