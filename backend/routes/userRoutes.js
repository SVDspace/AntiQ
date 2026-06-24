const protect = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

const { createUser, getUsers, loginUser, updateProfile, deleteProfile,getUserStats} = require("../controllers/userController");

router.post("/login", loginUser);

// POST
router.post("/add", createUser);

// GET
router.get("/", getUsers);

router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

router.get("/stats", protect, getUserStats);
router.put("/profile", protect, updateProfile);
router.delete("/profile", protect, deleteProfile);
module.exports = router;

