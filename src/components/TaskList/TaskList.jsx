import { Component } from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task'

import './TaskList.css'

export default class TaskList extends Component {
  static defaultProps = {
    todos: [],
    onDeleted: () => {},
    onToggleDone: () => {},
    onToggleEdit: () => {},
    updateTask: () => {},
  }

  static propTypes = {
    todos: PropTypes.arrayOf(
      PropTypes.shape({
        taskName: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        id: PropTypes.number,
        dateBirth: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        completed: PropTypes.bool,
        edit: PropTypes.bool,
        hidden: PropTypes.bool,
        input: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.string]),
      })
    ),
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
    onToggleEdit: PropTypes.func,
    updateTask: PropTypes.func,
  }

  render() {
    const { todos, onDeleted, onToggleDone, onToggleEdit, updateTask, toggleProperty } = this.props

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
}
