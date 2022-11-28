import { Component } from 'react'
import PropTypes from 'prop-types'

import './Task.css'
import Timer from '../Timer/Timer'
import TimeGone from '../TimeGone/TimeGone'

export default class Task extends Component {
  static defaultProps = {
    taskName: 'taskName не передан',
    completed: false,
    edit: false,
    id: () => {
      Math.random()
    },
    hidden: false,
    dateBirth: () => {
      Date.now()
    },
  }

  static propTypes = {
    taskName: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
    onToggleEdit: PropTypes.func,
    completed: PropTypes.bool,
    edit: PropTypes.bool,
    id: PropTypes.number,
    hidden: PropTypes.bool,
    dateBirth: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    updateTask: PropTypes.func,
  }

  timerOn(e) {
    console.log(e)
  }

  timerOff(e) {
    console.log(e)
  }

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
      timer,
    } = this.props

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
            {/* <span className="description">
              <button onClick={this.timerOn} className="icon icon-play"></button>
              <button onClick={this.timerOff} className="icon icon-pause"></button>
              {timer[0] || '0'}:{timer[1] || '0'}
            </span> */}
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
}
