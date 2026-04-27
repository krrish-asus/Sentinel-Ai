import express from "express";

const router = express.Router();

router.get("/logs", (req, res) => {
  res.json([
    {
      message: "SQL Injection",
      level: "high",
      createdAt: new Date()
    },
    {
      message: "XSS Attack",
      level: "medium",
      createdAt: new Date()
    }
  ]);
});

router.post("/logs", (req, res) => {
  const { message, level } = req.body;

  res.json({
    message,
    level,
    createdAt: new Date()
  });
});

export default router;