const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  joinQueue,
} = require("../controllers/tokenController");

router.post("/:queueId", protect, joinQueue);

module.exports = router;