import React from "react";
import Task from "../task/task";

import "./task-list.css";

const TaskList = ({ todos }) => {
  const tasks = todos.map((task) => {
    const taskInfo = task;
    return (
      <li key={taskInfo.id} className={taskInfo.taskType}>
        <Task {...taskInfo} />
      </li>
    );
  });
  return <ul className="todo-list">{tasks}</ul>;
};

export default TaskList;
