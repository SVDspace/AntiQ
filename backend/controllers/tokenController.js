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

if (queue.status === "closed" || queue.status === "paused") {
  return res.status(400).json({
    message: "Queue is currently unavailable",
  });
}

    const existingToken = await Token.findOne({
      user: req.user._id,
      queue: queue._id,
      status: "waiting",
    });

    if (existingToken) {

      return res.status(400).json({
        message: "Already in queue",
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

exports.getMyTokens = async (req, res) => {
  try {
    
  
      console.log("User ID:", req.user._id);

    const tokens = await Token.find({
      user: req.user._id,
    }).populate(
      "queue",
      "queueName location currentToken"
    )
    .sort({
      
      createdAt: -1,

    });

    res.json(tokens);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
};

exports.serveNextToken = async (req, res) => {
  try {

    const queue = await Queue.findById(
      req.params.queueId
    );

    if (!queue) {

      return res.status(404).json({
        message: "Queue not found",
      });

    }

    const nextToken = await Token.findOne({
      queue: queue._id,
      status: "waiting",
    }).sort({ tokenNumber: 1 });

    if (!nextToken) {

      return res.json({
        message: "No waiting tokens",
      });

    }

    nextToken.status = "completed";

    await nextToken.save();

    queue.currentToken =
      nextToken.tokenNumber;

    queue.totalPeople -= 1;

    if(queue.totalPeople <= 0){
      queue.status = "closed";
    }

    await queue.save();

    res.json(nextToken);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
};

exports.cancelToken = async (req, res) => {
  try {

    const token = await Token.findById(
      req.params.id
    );

    if (!token) {

      return res.status(404).json({
        message: "Token not found",
      });

    }

    token.status = "cancelled";

    await token.save();

    res.json({
      message: "Token cancelled",
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
};

exports.getTokenById = async (req, res) => {
  try {

    const token = await Token.findById(
      req.params.id
    )
      .populate("user", "name email")
      .populate(
        "queue",
        "queueName location currentToken"
      );

    if (token) {

      res.json(token);

    } else {

      res.status(404).json({
        message: "Token not found",
      });

    }

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
};

exports.getQueueHistory = async (req, res) => {
  try {

    const tokens = await Token.find({
      queue: req.params.queueId,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(tokens);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
};

exports.getWaitingTokens = async (req, res) => {
  try {
    const tokens = await Token.find({
      queue: req.params.queueId,
      status: "waiting",
    })
      .populate("user", "name")
      .sort({ tokenNumber: 1 });

    res.json(tokens);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getEstimatedTime = async (req, res) => {
  try {
    const token = await Token.findById(req.params.id).populate("queue");

    if (!token) {
      return res.status(404).json({
        message: "Token not found",
      });
    }

    const waitingBefore = await Token.countDocuments({
      queue: token.queue._id,
      status: "waiting",
      tokenNumber: {
        $lt: token.tokenNumber,
      },
    });

    const estimatedTime = waitingBefore * token.queue.estimatedTimePerToken;

    res.json({
      estimatedTime,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getQueueStats=
async(req,res)=>{
  try{
    const waiting= await Token.countDocuments({
      queue:req.params.queueId,
      status:"waiting",
    });
     const completed= await Token.countDocuments({
      queue:req.params.queueId,
      status:"completed",
    });
     const cancelled= await Token.countDocuments({
      queue:req.params.queueId,
      status:"cancelled",
    });

    res.json({
      waiting,
      completed,cancelled,
    });

  }catch(error){
    res.status(500).json({
      error:
      error.message,
    });
  }
};

exports.getTokenAnalytics =
async (req, res) => {

  try {

    const totalTokens =
      await Token.countDocuments();

    const waiting =
      await Token.countDocuments({
        status: "waiting",
      });

    const completed =
      await Token.countDocuments({
        status: "completed",
      });

    const cancelled =
      await Token.countDocuments({
        status: "cancelled",
      });

    res.json({
      totalTokens,
      waiting,
      completed,
      cancelled,
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

};