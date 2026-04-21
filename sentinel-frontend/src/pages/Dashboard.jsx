import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";

const API = "https://sentinel-ai-93oe.onrender.com/api";

const COLORS = ["#ff4d4d", "#ffaa00", "#00ffcc"];

export default function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState("ALL");

  // 🔥 FETCH LOGS
  const fetchLogs = async () => {
    try {
      const res = await fetch(`${API}/logs`);
      const data = await res.json();

      // 🔥 IMPORTANT FIX (your backend uses "level")
      const formatted = data.map((log) => ({
        ...log,
        severity:
          log.level?.toLowerCase() === "high"
            ? "High"
            : log.level?.toLowerCase() === "medium"
            ? "Medium"
            : "Low",
      }));

      setLogs(formatted);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // 🔥 SEND ATTACK
  const sendAttack = async (type) => {
    console.log("Sending:", type);

    try {
      await fetch(`${API}/logs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: type,
          severity: "low", // backend converts to level
          message: `${type} simulated`,
        }),
      });

      fetchLogs(); // refresh after send
    } catch (err) {
      console.error("POST error:", err);
    }
  };

  // 🔁 AUTO REFRESH
  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 3000);
    return () => clearInterval(interval);
  }, []);

  // 🔥 FILTER
  const filteredLogs =
    filter === "ALL"
      ? logs
      : logs.filter((log) => log.type === filter);

  // 🔥 GROUP FOR FLOW CHART
  const grouped = {};

  filteredLogs.forEach((log) => {
    const time = new Date(log.createdAt).toLocaleTimeString();

    if (!grouped[time]) {
      grouped[time] = {
        time,
        SQL: 0,
        XSS: 0,
        BRUTE: 0,
      };
    }

    if (log.type === "SQL Injection") grouped[time].SQL++;
    if (log.type === "XSS Attack") grouped[time].XSS++;
    if (log.type === "Brute Force") grouped[time].BRUTE++;
  });

  const chartData = Object.values(grouped);

  // 🔥 PIE DATA
  const pieData = [
    {
      name: "High",
      value: logs.filter((l) => l.severity === "High").length,
    },
    {
      name: "Medium",
      value: logs.filter((l) => l.severity === "Medium").length,
    },
    {
      name: "Low",
      value: logs.filter((l) => l.severity === "Low").length,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-green-400 p-6 font-mono">
      <h1 className="text-3xl mb-6">🚀 Sentinel AI Dashboard</h1>

      {/* 🔥 BUTTONS */}
      <div className="mb-6 flex gap-3 flex-wrap">
        <button
          onClick={() => {
            sendAttack("SQL Injection");
            setFilter("SQL Injection");
          }}
          className="px-4 py-2 bg-red-600 text-white"
        >
          SQL Injection
        </button>

        <button
          onClick={() => {
            sendAttack("XSS Attack");
            setFilter("XSS Attack");
          }}
          className="px-4 py-2 bg-yellow-600 text-white"
        >
          XSS Attack
        </button>

        <button
          onClick={() => {
            sendAttack("Brute Force");
            setFilter("Brute Force");
          }}
          className="px-4 py-2 bg-blue-600 text-white"
        >
          Brute Force
        </button>

        <button
          onClick={() => setFilter("ALL")}
          className="px-4 py-2 bg-gray-700 text-white"
        >
          ALL
        </button>
      </div>

      {/* 🔥 FLOW CHART */}
      <h2 className="text-xl mb-2">📈 Attack Flow</h2>
      <div className="bg-gray-900 p-4 mb-8 rounded">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid stroke="#333" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />

            <Line type="monotone" dataKey="SQL" stroke="#ff4d4d" />
            <Line type="monotone" dataKey="XSS" stroke="#ffaa00" />
            <Line type="monotone" dataKey="BRUTE" stroke="#00ffcc" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🔥 PIE */}
      <h2 className="text-xl mb-2">📊 Severity Distribution</h2>
      <div className="bg-gray-900 p-4 mb-8 rounded">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={pieData} dataKey="value" outerRadius={90} label>
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 🔥 LOGS */}
      <h2 className="text-xl mb-4">📜 Logs</h2>

      {filteredLogs.map((log, i) => (
        <div key={i} className="border-b border-gray-700 py-2">
          <p>Type: {log.type}</p>
          <p>Severity: {log.severity}</p>
          <p>Message: {log.message}</p>
        </div>
      ))}
    </div>
  );
}