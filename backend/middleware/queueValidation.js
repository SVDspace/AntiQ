const { body } = require("express-validator");

exports.createQueueValidation = [
  body("queueName")
    .notEmpty()
    .withMessage("Queue name required"),

  body("location")
    .notEmpty()
    .withMessage("Location required"),

  body("estimatedTimePerToken")
    .isNumeric()
    .withMessage("Estimated time must be number"),
];