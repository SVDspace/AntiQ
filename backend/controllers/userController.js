const User = require("../models/userModel");

// CREATE USER
exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET ALL USERS
exports.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};