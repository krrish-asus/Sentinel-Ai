import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import logRoutes from "./src/routes/logRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// TEST ROUTES
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

app.get("/test", (req, res) => {
  res.send("TEST OK ✅");
});

// 🔥 MAIN ROUTE
app.use("/api", logRoutes);

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT} - server.js:28`);
});