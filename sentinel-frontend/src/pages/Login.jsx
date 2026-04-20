import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">

      <h1 className="text-2xl mb-4">Login</h1>

      <input
        className="p-2 mb-2 text-black"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="p-2 mb-2 text-black"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-green-500 px-4 py-2"
      >
        Login
      </button>

    </div>
  );
}