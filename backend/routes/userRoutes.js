const protect = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

const { createUser, getUsers, loginUser, updateProfile, deleteProfile} = require("../controllers/userController");

router.post("/login", loginUser);

// POST
router.post("/add", createUser);

// GET
router.get("/", getUsers);

router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;

router.put("/profile", protect, updateProfile);
router.delete("/profile", protect, deleteProfile);