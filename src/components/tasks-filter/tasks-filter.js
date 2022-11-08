import React, { Component } from "react";

import "./tasks-filter.css";

export default class TasksFilter extends Component {
  render() {
    const { taskFilter, clearCompleted } = this.props;

    return (
      <>
        <ul className="filters">
          <li>
            <button onClick={(e) => taskFilter(e)} className="selected">
              All
            </button>
          </li>
          <li>
            <button onClick={(e) => taskFilter(e)}>Active</button>
          </li>
          <li>
            <button onClick={(e) => taskFilter(e)}>Completed</button>
          </li>
        </ul>
        <button onClick={() => clearCompleted()} className="clear-completed">
          Clear completed
        </button>
      </>
    );
  }
}
