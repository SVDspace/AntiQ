const Queue = require("../models/queueModel");

exports.createQueue = async (req, res) => {
  try {

    const queue = await Queue.create({
      queueName: req.body.queueName,
      location: req.body.location,
      estimatedTimePerToken: req.body.estimatedTimePerToken,
      createdBy: req.user._id,
    });

    res.status(201).json(queue);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
};
exports.getQueues = async (req, res) => {
  try {

    const queues = await Queue.find().populate(
      "createdBy",
      "name email"
    );

    res.json(queues);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
};