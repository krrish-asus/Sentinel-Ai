import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="fixed top-0 w-full flex justify-between items-center px-10 py-4 bg-black/40 backdrop-blur-lg z-50 text-white">

      <h1 className="text-xl font-bold">Sentinel AI</h1>

      <div className="flex gap-6 items-center">
        <p className="text-sm text-gray-300">
          krrishpawarr@gmail.com
        </p>

        <a
          href="https://instagram.com/sznhish"
          target="_blank"
          className="text-pink-400"
        >
          @sznhish
        </a>

        <Link to="/contact" className="hover:text-cyan-400">
          Contact
        </Link>

        <Link to="/query" className="hover:text-cyan-400">
          Query
        </Link>
      </div>
    </div>
  );
}