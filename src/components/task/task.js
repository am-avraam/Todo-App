import React, { Component } from "react";

import "./task.css";
// import { formatDistanceToNow } from "date-fns";
import TimeGone from "../time-gone/timegone.js";

export default class Task extends Component {
  render() {
    const {
      taskName,
      onDeleted,
      onToggleDone,
      onToggleEdit,
      completed,
      edit,
      id,
      hidden,
      dateBirth,
      updateTask,
    } = this.props;

    let editInput;
    let checked = false;
    let className = "";
    if (completed) {
      className += " completed";
      checked = true;
    } else if (edit) {
      className += " editing";

      if (edit) {
        editInput = (
          <input
            // id={id}
            type="text"
            className="edit"
            defaultValue={taskName}
            onKeyDown={updateTask}
          />
        );
      }
    }

    if (hidden) {
      className += " hidden";
    }

    // const birthDate = Date.now();

    return (
      <li className={className} id={id}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={checked}
            onChange={() => onToggleDone(id)}
          />
          <label onClick={onToggleDone}>
            <span className="description">{taskName}</span>
            <span className="created">
              <TimeGone dateBirth={dateBirth} />
            </span>
          </label>
          <button className="icon icon-edit" onClick={onToggleEdit}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {editInput}
      </li>
    );
  }
}
