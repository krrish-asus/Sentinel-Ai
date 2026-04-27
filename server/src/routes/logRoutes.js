import express from "express";

const router = express.Router();

router.get("/logs", (req, res) => {
  res.json([
    { id: 1, type: "SQL Injection", status: "Blocked" },
    { id: 2, type: "XSS Attack", status: "Blocked" }
  ]);
});

export default router;
