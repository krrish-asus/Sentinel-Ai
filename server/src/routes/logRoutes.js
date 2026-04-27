import express from "express";

const router = express.Router();

// GET logs
router.get("/logs", (req, res) => {
  res.json([
    {
      message: "SQL Injection attack",
      level: "high",
      createdAt: new Date()
    },
    {
      message: "XSS attack",
      level: "medium",
      createdAt: new Date()
    },
    {
      message: "Brute force attempt",
      level: "low",
      createdAt: new Date()
    }
  ]);
});

// POST log (for your buttons)
router.post("/logs", (req, res) => {
  const { message, level } = req.body;

  res.json({
    message,
    level,
    createdAt: new Date()
  });
});

export default router;