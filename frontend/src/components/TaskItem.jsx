import React from "react";

export default function TaskItem({ task, onToggle, onDelete }) {
  const due = task.due_date ? new Date(task.due_date).toLocaleDateString() : "";

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "HIGH": return "#f44336";
      case "MED": return "#ff9800";
      case "LOW": return "#2196f3";
      default: return "#bdbdbd";
    }
  };

  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && !task.is_complete;

  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        background: isOverdue ? "#8B0000" : "#232323",
        borderRadius: 12,
        margin: "0.5rem 0",
        padding: "14px 18px",
        boxShadow: "0 2px 8px #0001",
        color: isOverdue ? "#fff" : "inherit",
        transition: "background 0.3s, transform 0.3s",
        cursor: "pointer"
      }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
    >
      <input
        type="checkbox"
        checked={task.is_complete}
        onChange={() => onToggle(task)}
        style={{ marginRight: 18, width: 20, height: 20 }}
      />
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: "1.1rem",
          fontWeight: "bold",
          textDecoration: task.is_complete ? "line-through" : "none"
        }}>
          {task.title}
        </div>
        {task.description && (
          <div style={{ color: "#bbb", fontSize: 15, marginTop: 2 }}>{task.description}</div>
        )}
        <div style={{ marginTop: 4, fontSize: 14, display: "flex", gap: 14, color: "#aaa" }}>
          {task.due_date && <span>📅 {due}</span>}
          <span style={{
            color: "#fff",
            background: getPriorityColor(task.priority),
            borderRadius: 8,
            padding: "2px 10px",
            fontSize: 13,
            fontWeight: "bold"
          }}>
            {task.priority || "MED"}
          </span>
        </div>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        style={{
          marginLeft: 16,
          background: "#f44336",
          border: "none",
          color: "#fff",
          borderRadius: 7,
          padding: "7px 13px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
        title="Delete"
      >
        ✕
      </button>
    </li>
  );
}
