import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import logRoutes from "./src/routes/logRoutes.js";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Health check (ROOT)
app.get("/", (req, res) => {
  res.send("Sentinel AI Backend Running 🚀");
});

// ✅ DEBUG route (important for testing)
app.get("/test", (req, res) => {
  res.send("TEST ROUTE WORKING ✅");
});

// ✅ Routes
app.use("/api", logRoutes);

// ❌ Catch-all (helps debug 404 clearly)
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl
  });
});

// ✅ Start server
const PORT = process.env.PORT || 10000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT} - server.js:42`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed: - server.js:46", err.message);
  });