import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("info");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validation
  const validate = () => {
    if (!username || username.length < 3) return "Username must be at least 3 characters";
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return "Valid email required";
    if (!password || password.length < 8) return "Password must be at least 8 characters";
    if (password !== confirmPwd) return "Passwords do not match";
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setMsgType("error");
      setMsg(err);
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://127.0.0.1:8000/api/auth/register/", {
        username, email, password,
      });
      setMsgType("success");
      setMsg("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setMsgType("error");
      if (err.response && err.response.data) {
        setMsg(
          err.response.data.username?.[0] ||
          err.response.data.email?.[0] ||
          err.response.data.password?.[0] ||
          "Registration failed!"
        );
      } else {
        setMsg("Registration failed!");
      }
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#1a1a21",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        background: "#23232b",
        borderRadius: 22,
        boxShadow: "0 6px 32px #0005",
        padding: "2.8rem 2.2rem",
        width: "100%",
        maxWidth: 440,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <h1 style={{
          textAlign: "center",
          marginBottom: 30,
          fontWeight: 700,
          fontSize: "2.2rem",
          color: "#fff"
        }}>Register</h1>
        <form onSubmit={handleRegister} autoComplete="off" style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            autoComplete="username"
            style={inputStyle}
            disabled={loading}
            minLength={3}
          />
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            autoComplete="email"
            style={inputStyle}
            disabled={loading}
            type="email"
          />
          <div style={{ ...inputWrapStyle }}>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="new-password"
              type={showPwd ? "text" : "password"}
              style={{ ...inputStyle, marginBottom: 0, paddingRight: 42 }}
              disabled={loading}
              minLength={8}
            />
            <span
              style={eyeStyle}
              onClick={() => setShowPwd(s => !s)}
              title={showPwd ? "Hide Password" : "Show Password"}
            >
              {showPwd
                ? <span role="img" aria-label="hide">🙈</span>
                : <span role="img" aria-label="show">👁️</span>
              }
            </span>
          </div>
          <div style={{ ...inputWrapStyle, marginBottom: 22 }}>
            <input
              value={confirmPwd}
              onChange={e => setConfirmPwd(e.target.value)}
              placeholder="Confirm Password"
              autoComplete="new-password"
              type={showConfirm ? "text" : "password"}
              style={{ ...inputStyle, marginBottom: 0, paddingRight: 42 }}
              disabled={loading}
              minLength={8}
            />
            <span
              style={eyeStyle}
              onClick={() => setShowConfirm(s => !s)}
              title={showConfirm ? "Hide Password" : "Show Password"}
            >
              {showConfirm
                ? <span role="img" aria-label="hide">🙈</span>
                : <span role="img" aria-label="show">👁️</span>
              }
            </span>
          </div>
          <div style={{
            display: "flex", gap: 10, width: "100%", marginBottom: 0
          }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                background: "#1490f6",
                color: "#fff",
                fontWeight: 600,
                padding: "0.85rem 0",
                fontSize: 18,
                border: "none",
                borderRadius: 7,
                boxShadow: "0 2px 8px #0001",
                cursor: "pointer",
                transition: "0.18s",
                opacity: loading ? 0.6 : 1
              }}
            >
              {loading ? "Registering..." : "Register"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/login")}
              disabled={loading}
              style={{
                flex: 1,
                background: "#23232b",
                color: "#1490f6",
                fontWeight: 600,
                border: "1.5px solid #1490f6",
                borderRadius: 7,
                fontSize: 18,
                cursor: "pointer",
                padding: "0.85rem 0"
              }}
            >Login</button>
          </div>
        </form>
        {msg && (
          <div style={{
            marginTop: 18,
            textAlign: "center",
            fontWeight: 500,
            color:
              msgType === "success"
                ? "#1ec981"
                : msgType === "error"
                  ? "#ff5252"
                  : "#ffc700"
          }}>{msg}</div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.98rem 1.15rem",
  marginBottom: 18,
  borderRadius: 8,
  border: "none",
  background: "#e6efff",
  fontSize: 16,
  fontWeight: 500,
  outline: "none",
  boxSizing: "border-box",
  transition: "box-shadow 0.13s",
  boxShadow: "0 2px 8px #0001",
};

const inputWrapStyle = {
  position: "relative",
  width: "100%",
  marginBottom: 18
};

const eyeStyle = {
  position: "absolute",
  right: 16,
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
  fontSize: 22,
  color: "#888"
};
