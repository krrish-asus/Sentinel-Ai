import Log from "../models/Log.js";
import axios from "axios";

// 🔥 DETECT THREAT
const detectThreat = (message = "") => {
  const msg = message.toLowerCase();

  if (msg.includes("select") || msg.includes("<script") || msg.includes("drop")) return "high";
  if (msg.includes("login") || msg.includes("admin") || msg.includes("password")) return "medium";

  return "low";
};

// 🌍 GET IP LOCATION
const getLocation = async (ip) => {
  try {
    const res = await axios.get(`http://ip-api.com/json/${ip}`);
    return {
      country: res.data.country,
      city: res.data.city,
      lat: res.data.lat,
      lon: res.data.lon,
    };
  } catch {
    return {};
  }
};

// 🔥 CREATE LOG
export const createLog = async (req, res) => {
  try {
    const { message } = req.body;

    const ip =
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      "8.8.8.8"; // fallback for local

    const level = detectThreat(message);

    const location = await getLocation(ip);

    const log = await Log.create({
      message,
      level,
      ip,
      location,
    });

    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET LOGS
export const getLogs = async (req, res) => {
  const logs = await Log.find().sort({ createdAt: -1 });
  res.json(logs);
};

// STATS
export const getStats = async (req, res) => {
  const logs = await Log.find();

  const total = logs.length;
  const high = logs.filter(l => l.level === "high").length;
  const medium = logs.filter(l => l.level === "medium").length;
  const low = logs.filter(l => l.level === "low").length;

  res.json({ total, high, medium, low });
};