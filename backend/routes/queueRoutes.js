const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { createQueue } = require("../controllers/queueController");

router.post("/", protect, createQueue);

module.exports = router;