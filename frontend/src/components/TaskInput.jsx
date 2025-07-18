import React, { useState } from "react";

const priorities = [
  { value: "HIGH", label: "High" },
  { value: "MED", label: "Medium" },
  { value: "LOW", label: "Low" }
];

export default function TaskInput({ onAdd }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [due, setDue] = useState("");
  const [priority, setPriority] = useState("MED");
  const [error, setError] = useState("");


  const todayStr = new Date().toISOString().split("T")[0];

  const handleSubmit = e => {
    e.preventDefault();
    if (!title.trim()) return setError("Task title required");
    if (due) {
      const picked = new Date(due);
      const today = new Date(todayStr);
      if (picked < today) return setError("Due date cannot be in the past");
    }
    setError("");
    onAdd({
      title: title.trim(),
      description: desc.trim(),
      due_date: due || null,
      priority
    });
    setTitle(""); setDesc(""); setDue(""); setPriority("MED");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        margin: "1.3rem 0"
      }}
    >
      <input
        type="text"
        placeholder="New Task"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="Description"
        value={desc}
        onChange={e => setDesc(e.target.value)}
        style={inputStyle}
      />
      <input
        type="date"
        value={due}
        min={todayStr}
        onChange={e => setDue(e.target.value)}
        style={inputStyle}
      />
      <select
        value={priority}
        onChange={e => setPriority(e.target.value)}
        style={inputStyle}
      >
        {priorities.map(opt =>
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        )}
      </select>
      <button
        type="submit"
        style={{
          minWidth: 70,
          fontWeight: 600,
          background: "#2196f3",
          color: "#fff",
          border: "none",
          borderRadius: 5,
          padding: "0 18px",
          cursor: "pointer",
          height: 40
        }}
      >
        Add
      </button>
      {error && <div style={{ width: "100%", color: "#ff7675", marginTop: 6, fontWeight: 500 }}>{error}</div>}
    </form>
  );
}

const inputStyle = {
  flex: "1 1 120px",
  minWidth: 110,
  height: 40,
  borderRadius: 5,
  border: "1px solid #aaa",
  padding: "0 12px",
  fontSize: 16,
  outline: "none"
};
