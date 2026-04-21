import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      family: 4, // 🔥 FORCE IPV4 (fixes ECONNREFUSED)
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host} - db.js:9`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed: - db.js:11", error.message);
  }
};

export default connectDB;