const protect = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

const { createUser, getUsers, loginUser } = require("../controllers/userController");

router.post("/login", loginUser);

// POST
router.post("/add", createUser);

// GET
router.get("/", getUsers);

router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected profile route",
    user: req.user,
  });
});

module.exports = router;