// src/components/DashboardHeader.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardHeader() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 32
    }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: 700, margin: 0 }}>
        Welcome, <span style={{ color: "#2196f3" }}>{username}</span>
      </h1>
      <button
        onClick={handleLogout}
        style={{
          background: "#222",
          color: "#fff",
          padding: "10px 22px",
          border: "none",
          borderRadius: 8,
          fontWeight: 600,
          fontSize: 16,
          letterSpacing: "0.5px",
          boxShadow: "0 2px 8px #0002",
          cursor: "pointer",
          transition: "background 0.2s"
        }}
        onMouseOver={e => e.target.style.background = "#e53935"}
        onMouseOut={e => e.target.style.background = "#222"}
      >
        Log Out
      </button>
    </div>
  );
}
