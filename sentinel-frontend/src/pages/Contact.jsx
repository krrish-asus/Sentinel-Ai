export default function Contact() {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center">

      <h1 className="text-3xl font-bold mb-10">Contact Me</h1>

      <div className="space-y-6 text-lg">

        {/* LINKEDIN */}
        <a
          href="https://www.linkedin.com/in/krrish21/"
          target="_blank"
          className="flex items-center gap-4 hover:text-cyan-400"
        >
          🔗 <span>LinkedIn</span>
        </a>

        {/* GITHUB */}
        <a
          href="https://github.com/krrish-asus"
          target="_blank"
          className="flex items-center gap-4 hover:text-cyan-400"
        >
          💻 <span>GitHub</span>
        </a>

        {/* INSTAGRAM */}
        <a
          href="https://instagram.com/sznhish"
          target="_blank"
          className="flex items-center gap-4 hover:text-cyan-400"
        >
          📸 <span>@sznhish</span>
        </a>

        {/* EMAIL */}
        <div className="flex items-center gap-4 text-gray-300">
          📧 <span>krrishpawarr@gmail.com</span>
        </div>

      </div>
    </div>
  );
}