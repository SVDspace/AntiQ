const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Token = require("../models/tokenModel");

// CREATE USER
exports.createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
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

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user._id);

    if (user) {

      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      const updatedUser = await user.save();

      res.json(updatedUser);

    } else {

      res.status(404).json({
        message: "User not found",
      });

    }

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
};

exports.deleteProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user._id);

    if (user) {

      await user.deleteOne();

      res.json({
        message: "Account deleted",
      });

    } else {

      res.status(404).json({
        message: "User not found",
      });

    }

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
};
exports.getUserStats =
async (req, res) => {

  try {

    const totalTokens =
      await Token.countDocuments({

        user:
          req.user._id,

      });

    const completed =
      await Token.countDocuments({

        user:
          req.user._id,

        status:
          "completed",

      });

    const waiting =
      await Token.countDocuments({

        user:
          req.user._id,

        status:
          "waiting",

      });

    res.json({

      totalTokens,
      completed,
      waiting,

    });

  } catch (error) {

    res.status(500).json({
      error:
        error.message,
    });

  }
};