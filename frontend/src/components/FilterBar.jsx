import React from "react";

export default function FilterBar({ filter, setFilter }) {
  const filters = [
    { label: "All", value: "all" },
    { label: "To-Do", value: "todo" },
    { label: "Completed", value: "done" },
  ];

  return (
    <div style={{ margin: "14px 0", display: "flex", gap: 12 }}>
      {filters.map(f => (
        <button
          key={f.value}
          onClick={() => setFilter(f.value)}
          style={{
            background: filter === f.value ? "#2196f3" : "#333",
            color: filter === f.value ? "#fff" : "#ccc",
            border: "none",
            borderRadius: 7,
            padding: "8px 20px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: filter === f.value ? "0 2px 8px #2196f366" : undefined
          }}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
