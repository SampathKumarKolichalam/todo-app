import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskInput from "./TaskInput";
import FilterBar from "./FilterBar";
import ProgressBar from "./ProgressBar";
import TaskList from "./TaskList";
import DashboardHeader from "./DashboardHeader";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("date");  

  const token = localStorage.getItem("access");

  useEffect(() => {
    setLoading(true);
    axios.get("/api/tasks/", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setTasks(res.data))
      .catch(() => setTasks([]))
      .finally(() => setLoading(false));
  }, [token]);

  const addTask = (data) => {
    axios.post("/api/tasks/", data, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setTasks([...tasks, res.data]));
  };

  const updateTask = (id, data) => {
    axios.patch(`/api/tasks/${id}/`, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setTasks(tasks.map(t => t.id === id ? res.data : t)));
  };

  const deleteTask = (id) => {
    axios.delete(`/api/tasks/${id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => setTasks(tasks.filter(t => t.id !== id)));
  };

  const filteredTasks = tasks.filter(t =>
    filter === "all" ? true :
      filter === "todo" ? !t.is_complete :
        t.is_complete
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOption === "priority") {
      const priorityOrder = { HIGH: 1, MED: 2, LOW: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    } else if (sortOption === "date") {
      return new Date(a.due_date) - new Date(b.due_date);
    }
    return 0;
  });

  const completed = tasks.filter(t => t.is_complete).length;

  return (
    <div className="container"
      style={{
        maxWidth: "90%",
        width: "100%",
        margin: "20px auto",
        color: "#fff",
        background: "#1c1c24",
        minHeight: "90vh",
        padding: "2.5rem",
        borderRadius: 18,
        boxShadow: "0 6px 28px #0003"
      }}>
      <DashboardHeader />
      <TaskInput onAdd={addTask} />
      <ProgressBar completed={completed} total={tasks.length} />
      <FilterBar filter={filter} setFilter={setFilter} />

      <div style={{ margin: "12px 0" }}>
        <label style={{ marginRight: 8 }}>Sort by: </label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            border: "none",
            background: "#333",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          <option value="date">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      {loading ? <div>Loading...</div> :
        <TaskList
          tasks={sortedTasks}
          onToggle={task => updateTask(task.id, { is_complete: !task.is_complete })}
          onDelete={deleteTask}
        />}
    </div>
  );
}
