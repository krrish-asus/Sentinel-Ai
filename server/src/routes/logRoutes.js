import express from "express";
import {
  createLog,
  getLogs,
  getStats,
} from "../controllers/logController.js";

const router = express.Router();

router.post("/logs", createLog);
router.get("/logs", getLogs);

// 🔥 THIS IS WHAT YOU ARE MISSING
router.get("/stats", getStats);

export default router;