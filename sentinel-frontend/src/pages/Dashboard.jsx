import React, { useEffect, useState } from "react";
import axios from "axios";
import ThreatChart from "../components/ThreatChart";
import WorldMap from "../components/WorldMap";

const API = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔄 Fetch logs (auto refresh)
  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/logs`);
      setLogs(res.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();

    const interval = setInterval(() => {
      fetchLogs();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // 🚀 Add attack (INSTANT + FIXED)
  const sendAttack = async (type) => {
    try {
      let level = "low";

      if (type === "SQL Injection") level = "high";
      else if (type === "XSS Attack") level = "medium";
      else if (type === "Brute Force") level = "high";

      const tempLog = {
        id: Date.now(),
        message: type,
        level,
        createdAt: new Date(),
      };

      setLogs((prev) => [tempLog, ...prev]);

      await axios.post(`${API}/api/logs`, {
        message: type,
        level,
      });

    } catch (err) {
      console.error("Attack error:", err);
    }
  };

  const visibleLogs = showAll ? logs : logs.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#020617] text-cyan-300 p-6">

      <h1 className="text-3xl font-bold mb-6">
        🛡️ SOC Cyber Security Dashboard
      </h1>

      {/* BUTTONS */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button onClick={() => sendAttack("SQL Injection")} className="btn bg-red-600">SQL Injection</button>
        <button onClick={() => sendAttack("XSS Attack")} className="btn bg-yellow-500">XSS Attack</button>
        <button onClick={() => sendAttack("Brute Force")} className="btn bg-purple-600">Brute Force</button>
        <button onClick={() => setShowAll(!showAll)} className="btn bg-cyan-600">
          {showAll ? "Show Less" : "Show All Logs"}
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#0f172a] p-4 rounded-lg border border-cyan-500">
          <p>Total</p>
          <h2 className="text-xl">{logs.length}</h2>
        </div>
        <div className="bg-[#0f172a] p-4 rounded-lg border border-red-500">
          <p>High</p>
          <h2 className="text-xl text-red-400">
            {logs.filter(l => l.level === "high").length}
          </h2>
        </div>
        <div className="bg-[#0f172a] p-4 rounded-lg border border-yellow-500">
          <p>Medium</p>
          <h2 className="text-xl text-yellow-400">
            {logs.filter(l => l.level === "medium").length}
          </h2>
        </div>
        <div className="bg-[#0f172a] p-4 rounded-lg border border-green-500">
          <p>Low</p>
          <h2 className="text-xl text-green-400">
            {logs.filter(l => l.level === "low").length}
          </h2>
        </div>
      </div>

      {/* MAP */}
      <div className="mb-10 border border-cyan-500 rounded-xl p-4">
        <h2 className="mb-4">🌍 Global Attack Map</h2>
        <WorldMap logs={logs} />
      </div>

      {/* CHART */}
      <div className="mb-10 border border-cyan-500 rounded-xl p-4">
        <h2 className="mb-4">📈 Attack Flow</h2>
        <ThreatChart logs={logs} />
      </div>

      {/* LOGS */}
      <div className="border border-cyan-500 rounded-xl p-4">
        <h2 className="mb-4">📜 Live Logs</h2>

        {loading ? (
          <p>Loading...</p>
        ) : visibleLogs.length === 0 ? (
          <p>No logs yet</p>
        ) : (
          visibleLogs.map((log) => (
            <div
              key={`${log.id}-${log.createdAt}`}
              className="border-b border-gray-700 py-2 text-sm"
            >
              <p><b>Attack:</b> {log.message}</p>
              <p className="text-xs text-gray-400">
                Severity: {log.level}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;