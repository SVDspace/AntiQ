const Queue = require("../models/queueModel");


// CREATE QUEUE
exports.createQueue = async (req, res) => {

  try {

    const queue = await Queue.create({
      queueName: req.body.queueName,
      location: req.body.location,
      estimatedTimePerToken:
        req.body.estimatedTimePerToken,
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
exports.reopenQueue = async(req,res)=>{
  try{

    const queue = await Queue.findById(req.params.id);

    if(!queue){

      return res.status(404).json({
        message:"Queue not found",
      });
    }

    queue.status = "open";

    await queue.save();

    res.json(queue);
  }
  catch(error){

    res.status(500).json({
      error:error.message,
    });
  }
};