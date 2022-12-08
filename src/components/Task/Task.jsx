import './Task.css'
import Timer from '../Timer/Timer'
import TimeGone from '../TimeGone/TimeGone'

const Task = ({
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
  timer,
}) => {
  let editInput
  let checked = false
  let className = ''
  if (completed) {
    className += ' completed'
    checked = true
  } else if (edit) {
    className += ' editing'

    if (edit) {
      editInput = <input type="text" className="edit" defaultValue={taskName} onKeyDown={updateTask} />
    }
  }

  if (hidden) {
    className += ' hidden'
  }

  return (
    <li className={className} id={id}>
      <div className="view">
        <input
          className="toggle"
          id={`${id}${id}`}
          type="checkbox"
          checked={checked}
          onChange={() => onToggleDone(id)}
        />
        <label htmlFor={`${id}${id}`} /*onClick={onToggleDone} */>
          <span className="title">{taskName}</span>
          <Timer timer={timer} />

          <span className="description">
            created <TimeGone dateBirth={dateBirth} />
          </span>
        </label>

        <button className="icon icon-edit" onClick={onToggleEdit}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      {editInput}
    </li>
  )
}

export default Task
