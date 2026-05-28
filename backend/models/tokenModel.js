const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    tokenNumber: {
      type: Number,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    queue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Queue",
    },

    status: {
      type: String,
      enum: ["waiting", "completed", "cancelled"],
      default: "waiting",
    },

    estimatedWaitTime: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Token", tokenSchema);