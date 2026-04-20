import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import logRoutes from "./routes/logRoutes.js";

const app = express();

dotenv.config();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api", logRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running...");
});

export default app;