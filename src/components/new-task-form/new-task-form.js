import React, { Component } from "react";

import "./new-task-form.css";
// import TaskAdd from "../task-add/task-add";

export default class NewTaskForm extends Component {
  state = {
    inputValue: "",
  };

  onInputChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAdd(this.state.inputValue);
    this.setState({
      inputValue: "",
    });
  };

  render() {
    // const { onAdd } = this.props;
    return (
      <header className="header">
        <h1>todos</h1>
        {/* <TaskAdd onAdd={onAdd} /> */}
        <form className="task-add" onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onChange={this.onInputChange}
            value={this.state.inputValue}
            // onSubmit={this.onSubmit}
          />
          <button
            className="task-add__button"
            // onClick={() => onAdd(this.state.inputValue)}
          >
            Add task
          </button>
        </form>
      </header>
    );
  }
}
