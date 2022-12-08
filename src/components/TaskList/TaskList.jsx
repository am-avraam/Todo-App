import Task from '../Task/Task'

import './TaskList.css'

const TaskList = ({ todos, onDeleted, onToggleDone, onToggleEdit, updateTask, toggleProperty }) => {
  const tasks = todos.map((task) => {
    const { id, ...taskInfo } = task
    return (
      <Task
        {...taskInfo}
        toggleProperty={toggleProperty}
        id={id}
        updateTask={updateTask}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        onToggleEdit={() => onToggleEdit(id)}
        key={id}
      />
    )
  })
  return <ul className="todo-list">{tasks}</ul>
}

export default TaskList
