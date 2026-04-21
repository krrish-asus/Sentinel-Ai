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

  const API = "http://localhost:5000/api";

  // 🔄 FETCH DATA
  const fetchAll = async () => {
    try {
      const logsRes = await axios.get(`${API}/logs`);
      const statsRes = await axios.get(`${API}/stats`);

      const logsData = logsRes.data || [];

      setLogs(logsData);
      setStats(statsRes.data);

      const formatted = logsData.map((log, i) => ({
        name: `#${i + 1}`,
        value:
          log.level === "high"
            ? 3
            : log.level === "medium"
            ? 2
            : 1,
      }));

      setChartData(formatted);
    } catch (err) {
      console.log("Dashboard Error:", err.message);
    }
  };

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 3000);
    return () => clearInterval(interval);
  }, []);

  // 🔥 SEND ATTACK
  const sendLog = async (message) => {
    try {
      await axios.post(`${API}/logs`, { message });
      fetchAll();
    } catch (err) {
      console.log("Send Error:", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">

      <h1 className="text-3xl text-cyan-400 mb-6">
        🚀 Sentinel AI Dashboard
      </h1>

      {/* BUTTONS */}
      <div className="flex gap-3 mb-6">
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
          onClick={() => sendLog("Brute force login")}
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

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 p-4 text-center">
          Total: {stats.total}
        </div>

        <div className="bg-red-500 p-4 text-center">
          High: {stats.high}
        </div>

        <div className="bg-yellow-500 text-black p-4 text-center">
          Medium: {stats.medium}
        </div>

        <div className="bg-green-500 p-4 text-center">
          Safe: {stats.low}
        </div>
      </div>

      {/* GRAPH */}
      <div className="bg-gray-900 p-6 mb-8">
        <h2 className="text-xl mb-4">📈 Threat Trend</h2>

        <LineChart width={800} height={300} data={chartData}>
          <CartesianGrid stroke="#444" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#00ffff" />
        </LineChart>
      </div>

      {/* LOGS */}
      <div className="bg-gray-900 p-6">
        <h2 className="text-xl mb-4">📜 Logs</h2>

        {logs.length === 0 ? (
          <p>No logs found</p>
        ) : (
          logs.map((log, i) => (
            <div key={i} className="border-b border-gray-700 py-2">

              <div className={log.anomaly ? "text-red-400" : ""}>
                {log.message}
              </div>

              <div className="text-sm text-gray-400">
                🌍 {log.location?.country || "Unknown"}
              </div>

              <div className="text-xs text-gray-500">
                IP: {log.ip}
              </div>

              {log.anomaly && (
                <div className="text-red-500 text-sm">
                  ⚠️ Anomaly
                </div>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
}