const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  joinQueue,
  getMyTokens,
  serveNextToken,
  cancelToken,
  getTokenById,
  getQueueHistory,
} = require("../controllers/tokenController");

router.post("/:queueId", protect, joinQueue);
router.get("/my", protect, getMyTokens);
router.put("/serve/:queueId", protect, serveNextToken);
router.put("/cancel/:id", protect, cancelToken);
router.get("/:id", protect, getTokenById);
router.get("/history/:queueId", protect, getQueueHistory);

module.exports = router;

