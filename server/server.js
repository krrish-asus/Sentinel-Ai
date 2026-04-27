import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import logRoutes from "./src/routes/logRoutes.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// root check
app.get("/", (req, res) => {
  res.send("Sentinel AI Backend Running 🚀");
});

// debug route
app.get("/test", (req, res) => {
  res.send("TEST ROUTE WORKING ✅");
});

// logs route
app.use("/api", logRoutes);

// fallback (shows exact error)
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} - server.js:38`);
});