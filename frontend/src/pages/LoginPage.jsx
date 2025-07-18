// src/pages/LoginPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!username || !password) {
      setMsg("Username and password are required.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/auth/login/", {
        username,
        password,
      });
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("username", username);
      setMsg("Login successful!");
      setTimeout(() => navigate("/dashboard"), 700);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setMsg("Invalid username or password.");
      } else {
        setMsg("Something went wrong. Please try again.");
      }
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#1c1c24",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#23232e",
          padding: "2.5rem 2.5rem 2rem",
          borderRadius: 18,
          boxShadow: "0 6px 24px #0006",
          minWidth: 360,
          maxWidth: 360,
          color: "#fff",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 28, fontSize: "2rem" }}>
          Login
        </h2>
        <form onSubmit={handleLogin} autoComplete="off">
          <div style={{ marginBottom: 20 }}>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username"
              autoFocus
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "1rem",
                borderRadius: 6,
                border: "1px solid #333",
                background: "#282834",
                color: "#fff"
              }}
            />
          </div>
          <div style={{ marginBottom: 10, position: "relative" }}>
            <input
              value={password}
              type={showPw ? "text" : "password"}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "1rem",
                borderRadius: 6,
                border: "1px solid #333",
                background: "#282834",
                color: "#fff"
              }}
            />
            <button
              type="button"
              onClick={() => setShowPw(s => !s)}
              style={{
                position: "absolute",
                top: 0,
                right: 8,
                height: "100%",
                background: "none",
                border: "none",
                color: "#bbb",
                cursor: "pointer",
                fontSize: "1.1rem"
              }}
              tabIndex={-1}
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? "🙈" : "👁️"}
            </button>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                background: "#1693fa",
                color: "#fff",
                padding: "12px",
                border: "none",
                borderRadius: 6,
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: loading ? "not-allowed" : "pointer",
                marginTop: 2,
                transition: "background 0.2s"
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/register")}
              style={{
                flex: 1,
                background: "#23232e",
                color: "#1693fa",
                padding: "12px",
                border: "1px solid #1693fa",
                borderRadius: 6,
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer",
                marginTop: 2,
                transition: "background 0.2s"
              }}
            >
              Sign Up
            </button>
          </div>
          {msg && (
            <div
              style={{
                marginTop: 18,
                background: msg === "Login successful!" ? "#217939" : "#e14646",
                color: "#fff",
                borderRadius: 6,
                textAlign: "center",
                padding: "10px 5px 9px",
                fontSize: "1rem",
                fontWeight: 500,
                letterSpacing: 0.2
              }}
            >
              {msg}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
