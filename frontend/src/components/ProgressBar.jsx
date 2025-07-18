import React from "react";

export default function ProgressBar({ completed, total }) {
  const percent = total ? Math.round((completed / total) * 100) : 0;
  return (
    <div style={{ margin: "18px 0" }}>
      <div style={{
        background: "#333",
        borderRadius: 9,
        height: 20,
        width: "100%",
        position: "relative",
        boxShadow: "0 1px 6px #0002"
      }}>
        <div
          style={{
            background: "#4caf50",
            width: `${percent}%`,
            height: "100%",
            borderRadius: 9,
            transition: "width 0.3s"
          }}
        ></div>
        <div style={{
          position: "absolute",
          left: "50%",
          top: 0,
          transform: "translateX(-50%)",
          width: "100%",
          height: "100%",
          textAlign: "center",
          lineHeight: "20px",
          fontWeight: "bold",
          color: "#fff",
          fontSize: 14
        }}>
          {percent}% Complete ({completed} / {total})
        </div>
      </div>
    </div>
  );
}
