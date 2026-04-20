import { useState } from "react";
import axios from "axios";

export default function Query() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");

  const handleSubmit = async () => {
    if (!name || !email || !query) {
      alert("Fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/logs", {
        message: query,
      });

      alert("Query sent 🚀");
      setName("");
      setEmail("");
      setQuery("");
    } catch (err) {
      alert("Error sending query");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center">

      <h1 className="text-3xl font-bold mb-6">Send Query</h1>

      <div className="flex flex-col gap-4 w-80">

        <input
          placeholder="Your Name"
          className="p-2 text-black rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Your Email"
          className="p-2 text-black rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          placeholder="Your Query"
          className="p-2 text-black rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="bg-cyan-500 text-black py-2 rounded"
        >
          Send
        </button>

      </div>
    </div>
  );
}