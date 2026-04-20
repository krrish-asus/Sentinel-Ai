import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    high: 0,
    medium: 0,
    low: 0,
  });

  const [chartData, setChartData] = useState([]);

  // 🔥 FETCH DATA
  const fetchAll = async () => {
    try {
      const logsRes = await axios.get("http://localhost:5000/api/logs");
      const statsRes = await axios.get("http://localhost:5000/api/stats");

      setLogs(logsRes.data);
      setStats(statsRes.data);

      // 📊 GRAPH DATA
      const formatted = logsRes.data.map((log, index) => ({
        name: `#${index + 1}`,
        value:
          log.level === "high"
            ? 3
            : log.level === "medium"
            ? 2
            : 1,
      }));

      setChartData(formatted);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAll();

    // 🔄 AUTO REFRESH
    const interval = setInterval(fetchAll, 3000);
    return () => clearInterval(interval);
  }, []);

  // 🔥 BUTTON ACTIONS
  const sendLog = async (message) => {
    await axios.post("http://localhost:5000/api/logs", { message });
    fetchAll();
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">

      {/* 🔥 TITLE */}
      <h1 className="text-3xl font-bold mb-6">
        🚀 Sentinel AI Dashboard
      </h1>

      {/* 🔥 ATTACK BUTTONS */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <button
          onClick={() => sendLog("SELECT * FROM users")}
          className="bg-red-500 px-4 py-2 rounded"
        >
          SQL Attack
        </button>

        <button
          onClick={() => sendLog("<script>alert(1)</script>")}
          className="bg-yellow-500 px-4 py-2 rounded"
        >
          XSS Attack
        </button>

        <button
          onClick={() => sendLog("Brute force login attempt")}
          className="bg-pink-500 px-4 py-2 rounded"
        >
          Brute Force
        </button>

        <button
          onClick={() => sendLog("Normal traffic")}
          className="bg-green-500 px-4 py-2 rounded"
        >
          Normal
        </button>
      </div>

      {/* 📊 STATS CARDS */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 p-4 rounded">
          Total: {stats.total}
        </div>

        <div className="bg-red-500 p-4 rounded">
          High: {stats.high}
        </div>

        <div className="bg-yellow-500 p-4 rounded">
          Medium: {stats.medium}
        </div>

        <div className="bg-green-500 p-4 rounded">
          Safe: {stats.low}
        </div>
      </div>

      {/* 📈 GRAPH BACK (FIXED) */}
      <div className="bg-gray-900 p-6 rounded mb-8">
        <h2 className="text-xl mb-4">📈 Threat Trend</h2>

        <LineChart width={800} height={300} data={chartData}>
          <CartesianGrid stroke="#444" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#00ffff" />
        </LineChart>
      </div>

      {/* 📜 LOGS */}
      <div className="bg-gray-900 p-6 rounded">
        <h2 className="text-xl mb-4">📜 Logs</h2>

        {logs.length === 0 ? (
          <p>No logs found</p>
        ) : (
          logs.map((log, i) => (
            <div
              key={i}
              className="border-b border-gray-700 py-2 flex justify-between"
            >
              <span>{log.message}</span>
              <span className="uppercase">{log.level}</span>
            </div>
          ))
        )}
      </div>

    </div>
  );
}