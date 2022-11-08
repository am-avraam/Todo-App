import React, { Component } from "react";
import "./footer.css";
import TasksFilter from "../tasks-filter/tasks-filter";

export default class Footer extends Component {
  render() {
    const { count, filter, clearCompleted, ...todoData } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{count} items left</span>
        <TasksFilter
          {...todoData}
          taskFilter={filter}
          clearCompleted={clearCompleted}
        />
      </footer>
    );
  }
}
