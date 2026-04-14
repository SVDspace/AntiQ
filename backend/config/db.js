const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("DB Error Name:", error.name);
    console.error("DB Error Msg:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;