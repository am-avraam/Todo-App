import React, { Component } from "react";
import Task from "../task/task";

import "./task-list.css";

export default class TaskList extends Component {
  render() {
    const { todos, onDeleted, onToggleDone, onToggleEdit, updateTask } =
      this.props;

    const tasks = todos.map((task) => {
      const { id, ...taskInfo } = task;
      return (
        <Task
          {...taskInfo}
          id={id}
          updateTask={updateTask}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
          onToggleEdit={() => onToggleEdit(id)}
          key={id}
        />
      );
    });
    return <ul className="todo-list">{tasks}</ul>;
  }
}
