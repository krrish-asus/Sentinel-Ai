import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // ✅ correct path
import logRoutes from "./src/routes/logRoutes.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api", logRoutes);

// health check (VERY IMPORTANT for Render)
app.get("/", (req, res) => {
  res.send("Sentinel AI Backend Running 🚀");
});

// connect DB and start server
const PORT = process.env.PORT || 10000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} - server.js:28`);
  });
});