import express from "express";

const router = express.Router();

// ✅ THIS is the missing route
router.get("/logs", (req, res) => {
  res.json([
    {
      id: 1,
      type: "SQL Injection",
      ip: "192.168.1.10",
      status: "Blocked",
      country: "India"
    },
    {
      id: 2,
      type: "XSS Attack",
      ip: "192.168.1.20",
      status: "Blocked",
      country: "USA"
    },
    {
      id: 3,
      type: "Brute Force",
      ip: "192.168.1.30",
      status: "Detected",
      country: "Germany"
    }
  ]);
});

export default router;