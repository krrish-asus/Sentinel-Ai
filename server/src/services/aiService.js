export const analyzeThreat = (message) => {
  let threatType = "NONE";
  let severity = "LOW";

  const msg = message.toLowerCase();

  if (msg.includes("drop table") || msg.includes("select *")) {
    threatType = "SQL Injection";
    severity = "HIGH";
  }

  else if (msg.includes("<script>")) {
    threatType = "XSS Attack";
    severity = "HIGH";
  }

  else if (msg.includes("http://") || msg.includes("login now")) {
    threatType = "Phishing";
    severity = "MEDIUM";
  }

  else if (msg.includes("failed login") || msg.includes("unauthorized")) {
    threatType = "Suspicious Activity";
    severity = "MEDIUM";
  }

  return { threatType, severity };
};