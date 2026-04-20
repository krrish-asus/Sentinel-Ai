import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/sentinelAI");

    console.log("✅ MongoDB Connected - db.js:7");
  } catch (error) {
    console.error("❌ DB Error: - db.js:9", error.message);
    process.exit(1);
  }
};

export default connectDB;