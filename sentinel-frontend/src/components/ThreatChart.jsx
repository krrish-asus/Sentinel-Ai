import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function ThreatChart({ logs }) {

  // group logs by index (simple demo)
  const data = logs.map((log, index) => ({
    name: `#${index + 1}`,
    threats: log.level === "high" ? 1 : 0
  }));

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="threats"
            stroke="#ef4444"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}