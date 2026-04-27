import React, { useState } from "react";

const Query = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = () => {
    alert("Query submitted: " + query);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Query Page</h1>

      <textarea
        className="w-full p-3 bg-black border border-cyan-500"
        rows="5"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="mt-3 border px-4 py-2 border-cyan-500"
      >
        Submit
      </button>
    </div>
  );
};

export default Query;