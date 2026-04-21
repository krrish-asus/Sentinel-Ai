import express from "express";
import {
  getLogs,
  createLog,
  getStats,
} from "../controllers/logController.js";

const router = express.Router();

router.get("/logs", getLogs);
router.post("/logs", createLog);
router.get("/stats", getStats);

export default router;