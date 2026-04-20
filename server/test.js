import { io } from "socket.io-client";

// connect to backend
const socket = io("http://localhost:5000");

console.log("🔌 Connecting to server... - test.js:6");

// when connected
socket.on("connect", () => {
  console.log("✅ Connected to server: - test.js:10", socket.id);
});

// listen for alerts
socket.on("threatAlert", (data) => {
  console.log("🚨 THREAT ALERT RECEIVED: - test.js:15");
  console.log(data);
});