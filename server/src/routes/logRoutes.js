import express from "express";

const router = express.Router();

router.get("/logs", (req, res) => {
  res.json([
    {
      id: 1,
      type: "SQL Injection",
      ip: "192.168.1.10",
      status: "Blocked",
    },
    {
      id: 2,
      type: "XSS Attack",
      ip: "192.168.1.20",
      status: "Blocked",
    },
    {
      id: 3,
      type: "Brute Force",
      ip: "192.168.1.30",
      status: "Detected",
    },
  ]);
});

export default router;