import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import logRoutes from "./src/routes/logRoutes.js";

const app = express();

// ✅ CONNECT DATABASE FIRST
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api", logRoutes);

// start server
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000 - server.js:20");
});