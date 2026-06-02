const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema(
  {
    queueName: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    currentToken: {
      type: Number,
      default: 0,
    },

    estimatedTimePerToken: {
      type: Number,
      default: 5,
    },

    totalPeople: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status:{
      type:String,
      enum:["open","closed","paused"],
      default:"open",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Queue", queueSchema);