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

exports.getQueueById = async (req, res) => {
  try {

    const queue = await Queue.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (queue) {

      res.json(queue);

    } else {

      res.status(404).json({
        message: "Queue not found",
      });

    }

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
};

// @desc Update queue

const updateQueue = async (req, res) => {
  try {
    const queue = await Queue.findById(req.params.id);

    if (!queue) {
      return res.status(404).json({
        message: "Queue not found",
      });
    }

    queue.name = req.body.name || queue.name;
    queue.description =
      req.body.description || queue.description;
    queue.status = req.body.status || queue.status;

    const updatedQueue = await queue.save();

    res.json(updatedQueue);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc Delete queue
// @route DELETE /api/queues/:id
// @access Private
const deleteQueue = async (req, res) => {
  try {
    const queue = await Queue.findById(req.params.id);

    if (!queue) {
      return res.status(404).json({
        message: "Queue not found",
      });
    }

    await queue.deleteOne();

    res.json({
      message: "Queue removed",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};