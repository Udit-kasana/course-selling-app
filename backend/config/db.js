const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_SERVER);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Failed:", err.message);
    process.exit(1);
  }
};
