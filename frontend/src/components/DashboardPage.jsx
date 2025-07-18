// src/components/DashboardPage.jsx (or wherever your dashboard is)
import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskInput from "./TaskInput";
import FilterBar from "./FilterBar";
import ProgressBar from "./ProgressBar";
import TaskList from "./TaskList";
import DashboardHeader from "./DashboardHeader"; // <-- Add this line

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Auth token (JWT)
  const token = localStorage.getItem("access"); // "access" is correct

  // Fetch tasks
  useEffect(() => {
    setLoading(true);
    axios.get("/api/tasks/", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setTasks(res.data))
      .catch(() => setTasks([]))
      .finally(() => setLoading(false));
  }, [token]);

  // Add task
  const addTask = (data) => {
    axios.post("/api/tasks/", data, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setTasks([...tasks, res.data]));
  };

  // Update (toggle) task
  const updateTask = (id, data) => {
    axios.patch(`/api/tasks/${id}/`, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setTasks(tasks.map(t => t.id === id ? res.data : t)));
  };

  // Delete task
  const deleteTask = (id) => {
    axios.delete(`/api/tasks/${id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => setTasks(tasks.filter(t => t.id !== id)));
  };

  // Filtered tasks
  const filteredTasks = tasks.filter(t =>
    filter === "all" ? true :
      filter === "todo" ? !t.is_complete :
        t.is_complete
  );

  // Progress counts
  const completed = tasks.filter(t => t.is_complete).length;

  return (
    <div className="container"
      style={{
        maxWidth: 600,
        margin: "40px auto",
        color: "#fff",
        background: "#1c1c24",
        minHeight: "90vh",
        padding: "2.5rem",
        borderRadius: 18,
        boxShadow: "0 6px 28px #0003"
      }}>
      <DashboardHeader /> {/* <-- Add this line at the top */}
      <TaskInput onAdd={addTask} />
      <ProgressBar completed={completed} total={tasks.length} />
      <FilterBar filter={filter} setFilter={setFilter} />
      {loading ? <div>Loading...</div> :
        <TaskList
          tasks={filteredTasks}
          onToggle={task => updateTask(task.id, { is_complete: !task.is_complete })}
          onDelete={deleteTask}
        />}
    </div>
  );
}
