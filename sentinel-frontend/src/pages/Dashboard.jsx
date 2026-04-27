import React, { useEffect, useState } from "react";
import axios from "axios";
import ThreatChart from "../components/ThreatChart";
import WorldMap from "../components/WorldMap";

const API = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState("ALL");

  // 🔄 Fetch logs
  const fetchLogs = async () => {
    try {
      const res = await axios.get(`${API}/logs`);
      setLogs(res.data.reverse());
    } catch (err) {
      console.error("Error fetching logs:", err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // 🚀 Send attack (FIXED)
  const sendAttack = async (type) => {
    try {
      await axios.post(`${API}/logs`, {
        message: `${type} simulated`,
        level: "low",
      });
      fetchLogs();
    } catch (err) {
      console.error("Error sending attack:", err);
    }
  };

  // 📊 Stats (FIXED)
  const total = logs.length;
  const high = logs.filter((l) => l.level === "high").length;
  const medium = logs.filter((l) => l.level === "medium").length;
  const low = logs.filter((l) => l.level === "low").length;

  // 🔍 Filter logs (FIXED)
  const filteredLogs =
    filter === "ALL"
      ? logs
      : logs.filter((log) =>
          log.message.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div className="bg-[#020617] text-cyan-300 min-h-screen p-6">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6">
        🚀 Sentinel AI Dashboard
      </h1>

      {/* BUTTONS */}
      <div className="flex gap-3 mb-6">
        <button onClick={() => sendAttack("SQL Injection")} className="btn">
          SQL Injection
        </button>
        <button onClick={() => sendAttack("XSS Attack")} className="btn">
          XSS Attack
        </button>
        <button onClick={() => sendAttack("Brute Force")} className="btn">
          Brute Force
        </button>
        <button onClick={() => setFilter("ALL")} className="btn">
          ALL
        </button>
      </div>

      {/* 🌍 GLOBE + STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* LEFT → GLOBE */}
        <div className="bg-[#020617] border border-cyan-500 rounded-xl p-4 flex justify-center items-center">
          <div style={{ width: "400px", height: "400px" }}>
            <WorldMap />
          </div>
        </div>

        {/* RIGHT → STATS */}
        <div className="bg-[#020617] border border-cyan-500 rounded-xl p-4">
          <h2 className="text-xl mb-4">📊 Stats</h2>
          <p>Total: {total}</p>
          <p>High: {high}</p>
          <p>Medium: {medium}</p>
          <p>Low: {low}</p>
        </div>
      </div>

      {/* 📈 ATTACK FLOW CHART */}
      <div className="bg-[#020617] border border-cyan-500 rounded-xl p-4 mb-10">
        <h2 className="text-xl mb-4">📈 Attack Flow</h2>
        <ThreatChart logs={logs} />
      </div>

      {/* 📜 LOGS */}
      <div className="bg-[#020617] border border-cyan-500 rounded-xl p-4">
        <h2 className="text-xl mb-4">📜 Logs</h2>

        {filteredLogs.length === 0 ? (
          <p>No logs found</p>
        ) : (
          filteredLogs.map((log, i) => (
            <div
              key={i}
              className="border-b border-gray-700 py-2 text-sm"
            >
              <p><span className="text-cyan-400">Type:</span> {log.message}</p>
              <p><span className="text-cyan-400">Severity:</span> {log.level}</p>
              <p className="text-gray-400 text-xs">
                {new Date(log.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;