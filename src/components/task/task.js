import React from "react";

import "./task.css";
import { formatDistanceToNow } from "date-fns";

const Task = ({ taskType = false }) => {
  let description;
  let editInput;
  if (!taskType) {
    description = "Active task";
  } else if (taskType === "editing") {
    description = "Editing task";
    editInput = (
      <input type="text" className="edit" defaultValue="Editing task" />
    );
  } else if (taskType === "completed") {
    description = "Completed task";
  }

  const timeGone = formatDistanceToNow(Date.now(), {
    includeSeconds: true,
  });

  return (
    <>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description">{description}</span>
          <span className="created">{timeGone}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
      {editInput}
    </>
  );
};

export default Task;
