import { useNavigate } from "react-router-dom";
import GlobeComponent from "../components/Globe";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617] text-white relative">

      {/* TOP RIGHT */}
      <div className="absolute top-4 right-6 flex gap-6 items-center text-sm">
        <span className="text-gray-300">
          krrishpawarr@gmail.com
        </span>

        <a
          href="https://instagram.com/sznhish"
          target="_blank"
          className="text-purple-400"
        >
          @sznhish
        </a>

        <button
          onClick={() => navigate("/contact")}
          className="bg-gray-800 px-3 py-1 rounded"
        >
          Contact
        </button>

        <button
          onClick={() => navigate("/query")}
          className="bg-gray-800 px-3 py-1 rounded"
        >
          Query
        </button>
      </div>

      {/* CENTER */}
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">

        <h1 className="text-4xl font-bold text-cyan-400 mb-6">
          We detect, analyze and prevent cyber threats.
        </h1>

        <p className="text-gray-300 mb-8 max-w-xl">
          Sentinel AI monitors logs in real-time and detects attacks using AI.
        </p>

        <div className="flex gap-4 mb-10">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-cyan-500 text-black px-6 py-2 rounded"
          >
            Open Dashboard 🚀
          </button>

          <button
            onClick={() => navigate("/query")}
            className="bg-gray-700 px-6 py-2 rounded"
          >
            Send Query
          </button>
        </div>

        {/* 🌍 GLOBE */}
        <div className="w-full max-w-3xl">
          <GlobeComponent />
        </div>

      </div>
    </div>
  );
}