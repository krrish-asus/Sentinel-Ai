import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const ThreatChart = ({ logs }) => {

  const data = logs.map((log, index) => ({
    name: index + 1,
    severity:
      log.level === "high" ? 100 :
      log.level === "medium" ? 60 :
      30,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#0ff" />
        <XAxis dataKey="name" stroke="#0ff" />
        <YAxis stroke="#0ff" />
        <Tooltip />

        <Line
          type="monotone"
          dataKey="severity"
          stroke="#00ffff"
          strokeWidth={2}
          dot={{ r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ThreatChart;