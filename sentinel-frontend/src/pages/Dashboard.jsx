import React, { useEffect, useState } from "react";
import axios from "axios";
import ThreatChart from "../components/ThreatChart";
import WorldMap from "../components/WorldMap";

const API = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/logs`);
      setLogs(res.data || []);
    } catch (err) {
      console.error(err);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const sendAttack = async (type) => {
    try {
      await axios.post(`${API}/api/logs`, {
        message: `${type} detected`,
        level: type === "SQL Injection" ? "high" : "medium",
      });
      fetchLogs();
    } catch (err) {
      console.error(err);
    }
  };

  // Stats
  const total = logs.length;
  const high = logs.filter((l) => l.level === "high").length;
  const medium = logs.filter((l) => l.level === "medium").length;
  const low = logs.filter((l) => l.level === "low").length;

  return (
    <div className="min-h-screen bg-[#020617] text-cyan-300 p-6 font-mono">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-cyan-400 tracking-wider">
          🛡️ SENTINEL AI SOC
        </h1>
        <span className="text-green-400 animate-pulse">
          ● SYSTEM ACTIVE
        </span>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3 mb-6">
        <button onClick={() => sendAttack("SQL Injection")} className="cyber-btn">
          SQL Attack
        </button>
        <button onClick={() => sendAttack("XSS Attack")} className="cyber-btn">
          XSS Attack
        </button>
        <button onClick={() => sendAttack("Brute Force")} className="cyber-btn">
          Brute Force
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 🌍 MAP */}
        <div className="cyber-card col-span-2">
          <h2 className="cyber-title">🌍 GLOBAL THREAT MAP</h2>
          <WorldMap logs={logs} />
        </div>

        {/* 📊 STATS */}
        <div className="cyber-card">
          <h2 className="cyber-title">📊 THREAT STATS</h2>
          <div className="space-y-2">
            <p>Total: <span className="text-white">{total}</span></p>
            <p className="text-red-400">High: {high}</p>
            <p className="text-yellow-400">Medium: {medium}</p>
            <p className="text-green-400">Low: {low}</p>
          </div>
        </div>

        {/* 📈 CHART */}
        <div className="cyber-card col-span-2">
          <h2 className="cyber-title">📈 ATTACK FLOW</h2>
          <ThreatChart logs={logs} />
        </div>

        {/* 📜 LOGS */}
        <div className="cyber-card">
          <h2 className="cyber-title">📜 LIVE LOGS</h2>

          {loading ? (
            <p>Loading...</p>
          ) : logs.length === 0 ? (
            <p>No logs</p>
          ) : (
            <div className="h-64 overflow-y-auto text-sm space-y-2">
              {logs.slice(0, 10).map((log, i) => (
                <div key={i} className="border-b border-gray-700 pb-1">
                  <p className="text-cyan-400">{log.message}</p>
                  <p className="text-xs text-gray-400">{log.level}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;