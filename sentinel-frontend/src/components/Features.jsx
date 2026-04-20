export default function Features() {
  const features = [
    "Real-time threat detection",
    "AI-based classification",
    "Live dashboard monitoring",
    "Attack pattern analysis",
  ];

  return (
    <section className="min-h-screen bg-[#020617] text-white px-20 py-20">

      <h2 className="text-4xl mb-10">
        See the highlights of this system
      </h2>

      <div className="grid grid-cols-2 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white/5 p-6 rounded-xl hover:scale-105 transition"
          >
            {f}
          </div>
        ))}
      </div>
    </section>
  );
}