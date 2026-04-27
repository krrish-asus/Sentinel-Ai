import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-cyan-300 p-6">
      <h1 className="text-3xl font-bold mb-6">📞 Contact</h1>

      <div className="space-y-4">
        <p>Email: example@gmail.com</p>

        {/* ✅ FIXED */}
        <a
          href="https://instagram.com"
          target="https://www.instagram.com/sznhish/"
          rel="noopener noreferrer"
          className="text-pink-400 underline"
        >
          Instagram
        </a>

        <a
          href="https://linkedin.com"
          target="https://www.linkedin.com/in/krrish21/"
          rel="noopener noreferrer"
          className="text-blue-400 underline"
        >
          LinkedIn
        </a>

        <a
          href="https://github.com"
          target="https://github.com/krrish-asus"
          rel="noopener noreferrer"
          className="text-blue-400 underline"
        >
          Github
        </a>
      </div>
    </div>
  );
};

export default Contact;