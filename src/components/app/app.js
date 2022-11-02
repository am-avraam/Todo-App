import React from "react";

import NewTaskForm from "../new-task-form/new-task-form";
import TaskList from "../task-list/task-list";
import Footer from "../footer/footer";

import "./app.css";

const App = () => {
  const todoData = [
    { taskType: "completed", id: 1 },
    { taskType: "editing", id: 2 },
    { taskType: "", id: 3 },
    // { label: "Ball Enginner", id: 1 },
    // { label: "Cartier Vermeil", important: true, id: 2 },
    // { label: "Omega Constellation", important: false, id: 3 },
  ];

  return (
    <section className="todoapp">
      <NewTaskForm />
      <section className="main">
        <TaskList todos={todoData} />
        <Footer />
      </section>
    </section>
  );
};

export default App;
