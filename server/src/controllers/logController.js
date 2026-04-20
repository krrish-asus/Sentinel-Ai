import Log from "../models/Log.js";
import { getIO } from "../sockets/socket.js";

// 🔥 THREAT DETECTION (FIXED + STRONG)
const detectThreat = (message = "") => {
  const msg = message.toLowerCase();

  // HIGH threats
  if (
    msg.includes("select") ||
    msg.includes("drop") ||
    msg.includes("union") ||
    msg.includes("<script") ||
    msg.includes("alert(")
  ) {
    return "high";
  }

  // MEDIUM threats
  if (
    msg.includes("admin") ||
    msg.includes("password") ||
    msg.includes("login") ||
    msg.includes("brute")
  ) {
    return "medium";
  }

  // SAFE
  return "low";
};

// ✅ CREATE LOG
export const createLog = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    // 🔥 IMPORTANT: DO NOT TRUST FRONTEND LEVEL
    const level = detectThreat(message);

    const log = await Log.create({
      message,
      level, // always controlled by backend
    });

    // 🔥 SOCKET EMIT (SAFE)
    try {
      const io = getIO();
      if (io) {
        io.emit("new-log", log);
      }
    } catch (e) {
      console.log("Socket not initialized yet - logController.js:57");
    }

    res.status(201).json(log);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET ALL LOGS
export const getLogs = async (req, res) => {
  try {
    const logs = await Log.find().sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET STATS (FIXED CORE ISSUE)
export const getStats = async (req, res) => {
  try {
    const logs = await Log.find();

    const total = logs.length;

    const high = logs.filter(
      (l) => l.level && l.level.toLowerCase() === "high"
    ).length;

    const medium = logs.filter(
      (l) => l.level && l.level.toLowerCase() === "medium"
    ).length;

    const low = logs.filter(
      (l) => l.level && l.level.toLowerCase() === "low"
    ).length;

    res.json({
      total,
      high,
      medium,
      low,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};