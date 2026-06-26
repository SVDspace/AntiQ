const Queue = require("../models/queueModel");
const Token = require("../models/tokenModel");


// CREATE QUEUE
exports.createQueue = async (req, res) => {
  try {

    const existingQueue = await Queue.findOne({
      queueName: req.body.queueName,
      createdBy: req.user._id,
    });

    if (existingQueue) {
      return res.status(400).json({
        message: "Queue already exists",
      });
    }

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

// GET ALL QUEUES
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


// GET QUEUE BY ID
exports.getQueueById = async (req, res) => {

  try {

    const queue = await Queue.findById(
      req.params.id
    ).populate(
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


// UPDATE QUEUE
exports.updateQueue = async (req, res) => {

  try {

    const queue = await Queue.findById(
      req.params.id
    );
console.log("Queue owner:", queue.createdBy.toString());
console.log("Current user:", req.user.id);
     if(queue.createdBy.toString()!==req.user._id.toString())
  {
    return res.status(401).json({
      message:"Not authorized",
    });
  }

    if (!queue) {

      return res.status(404).json({
        message: "Queue not found",
      });

    }

   

    queue.queueName =
      req.body.queueName ||
      queue.queueName;

    queue.location =
      req.body.location ||
      queue.location;

    queue.estimatedTimePerToken =
      req.body.estimatedTimePerToken ||
      queue.estimatedTimePerToken;

    const updatedQueue =
      await queue.save();

    res.json(updatedQueue);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// DELETE QUEUE
exports.deleteQueue = async (req, res) => {

  try {

    const queue = await Queue.findById(
      req.params.id
    );

    if (!queue) {

      return res.status(404).json({
        message: "Queue not found",
      });

    }
    if (
  queue.createdBy.toString() !==
  req.user._id.toString()
) {
  return res.status(401).json({
    message: "Not authorized",
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

exports.getQueueStats = async (req, res) => {
  try {

    const queue = await Queue.findById(
      req.params.id
    );

    if (!queue) {

      return res.status(404).json({
        message: "Queue not found",
      });

    }

    res.json({
      currentToken: queue.currentToken,
      totalPeople: queue.totalPeople,
      estimatedTimePerToken:
        queue.estimatedTimePerToken,
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
};

//Update queue status
exports.reopenQueue = async (req, res) => {
  try {

    const queue = await Queue.findById(req.params.id);

    if (!queue) {

      return res.status(404).json({
        message: "Queue not found",
      });
    }

    queue.status = "open";

    await queue.save();

    res.json(queue);
  }
  catch (error) {

    res.status(500).json({
      error: error.message,
    });
  }
};

//Update queue status API
exports.updateQueueStatus = async (req, res) => {
  try {
    const queue = await Queue.findById(
      req.params.id
    );

    if (!queue) {
      return res.status(404).json({
        message: "Queue not found",
      });
    }

    queue.status =
      req.body.status || queue.status;

    await queue.save();

    res.json(queue);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getMyQueues = async (req, res) => {
  try {
    const queues = await Queue.find({
      createdBy: req.user._id,
    });

    res.json(queues);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.searchQueues = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          queueName: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const queues = await Queue.find(keyword);

    res.json(queues);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getQueueAnalytics = async (req, res) => {
  try {
    const totalTokens = await Token.countDocuments({
      queue: req.params.id,
    });

    const completedTokens = await Token.countDocuments({
      queue: req.params.id,
      status: "completed",
    });

    const cancelledTokens = await Token.countDocuments({
      queue: req.params.id,
      status: "cancelled",
    });

    const waitingTokens = await Token.countDocuments({
      queue: req.params.id,
      status: "waiting",
    });

    res.json({
      totalTokens,
      completedTokens,
      cancelledTokens,
      waitingTokens,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.reopenQueue = async (req, res) => {
  try {
    const queue = await Queue.findById(req.params.id);

    if (!queue) {
      return res.status(404).json({
        message: "Queue not found",
      });
    }

    queue.status = "open";
    await queue.save();

    res.json(queue);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
//Queue Status Controller
exports.getQueueStatus = async (req, res) => {
  try {
    const queue = await Queue.findById(
      req.params.id
    );

    if (!queue) {
      return res.status(404).json({
        message: "Queue not found",
      });
    }

    const waiting =
      await Token.countDocuments({
        queue: queue._id,
        status: "waiting",
      });

    res.json({
      queueName: queue.queueName,
      location: queue.location,
      waitingTokens: waiting,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.searchQueues = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const queues = await Queue.find({
      queueName: {
        $regex: keyword,
        $options: "i",
      },
    });

    res.json(queues);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getQueueAnalytics =
async (req, res) => {

  try {

    const totalQueues =
      await Queue.countDocuments();

    const queues =
      await Queue.find();

    res.json({

      totalQueues,

      queueList:
        queues.length,

    });

  } catch (error) {

    res.status(500).json({
      error:
        error.message,
    });

  }
};