import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import logRoutes from "./src/routes/logRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ ROOT CHECK
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// ✅ DEBUG
app.get("/test", (req, res) => {
  res.send("TEST OK ✅");
});

// ✅ IMPORTANT (API PREFIX)
app.use("/api", logRoutes);

// ❌ Catch errors
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});