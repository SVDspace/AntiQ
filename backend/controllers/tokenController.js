const Token = require("../models/tokenModel");
const Queue = require("../models/queueModel");

exports.joinQueue = async (req, res) => {
  try {

    const queue = await Queue.findById(req.params.queueId);

    if (!queue) {
      return res.status(404).json({
        message: "Queue not found",
      });
    }

    const lastToken = await Token.findOne({
      queue: queue._id,
    }).sort({ tokenNumber: -1 });

    const nextTokenNumber =
      lastToken ? lastToken.tokenNumber + 1 : 1;

    const peopleAhead = await Token.countDocuments({
      queue: queue._id,
      status: "waiting",
    });

    const estimatedWaitTime =
      peopleAhead * queue.estimatedTimePerToken;

    const token = await Token.create({
      tokenNumber: nextTokenNumber,
      user: req.user._id,
      queue: queue._id,
      estimatedWaitTime,
    });

    queue.totalPeople += 1;

    await queue.save();

    res.status(201).json(token);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
};