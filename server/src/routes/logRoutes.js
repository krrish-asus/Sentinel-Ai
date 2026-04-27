import express from "express";

const router = express.Router();

// 🔥 in-memory logs (works without DB)
let logs = [];

// GET logs
router.get("/logs", (req, res) => {
  res.json(logs);
});

// POST new log
router.post("/logs", (req, res) => {
  const { message, level } = req.body;

  const newLog = {
    id: Date.now(),
    message,
    level,
    createdAt: new Date(),
  };

  logs.unshift(newLog);

  res.json(newLog);
});

export default router;