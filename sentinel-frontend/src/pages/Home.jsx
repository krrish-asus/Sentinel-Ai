import Globe from "../components/Globe";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#00ffff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* TOP BAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 40px",
        }}
      >
        <h2>Sentinel AI</h2>

        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <span>krrishpawarr@gmail.com</span>
          <span>@sznhish</span>

          <button onClick={() => navigate("/contact")}>Contact</button>
          <button onClick={() => navigate("/query")}>Query</button>
        </div>
      </div>

      {/* CENTER CONTENT */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          gap: "20px",
        }}
      >
        <h1 style={{ fontSize: "40px", textShadow: "0 0 20px #00ffff" }}>
          We detect, analyze and prevent cyber threats.
        </h1>

        <p>
          Sentinel AI monitors logs in real-time and detects attacks using AI.
        </p>

        <div style={{ display: "flex", gap: "15px" }}>
          <button onClick={() => navigate("/dashboard")}>
            Open Dashboard 🚀
          </button>

          <button onClick={() => navigate("/query")}>
            Send Query
          </button>
        </div>

        {/* BIG GLOBE */}
        <div style={{ width: "500px", height: "500px" }}>
          <Globe />
        </div>
      </div>
    </div>
  );
}