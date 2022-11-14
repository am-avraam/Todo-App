import { Component } from 'react'
import PropTypes from 'prop-types'

import './TasksFilter.css'

export default class TasksFilter extends Component {
  static propTypes = {
    taskFilter: PropTypes.func,
    clearCompleted: PropTypes.func,
  }

  render() {
    const { taskFilter, clearCompleted } = this.props
    let { filterSelect } = this.props

    const filters = filterSelect.map((filter) => {
      const { id, selected } = filter
      let className = ''
      if (selected) {
        className = 'selected'
      }
      return (
        <li key={id}>
          <button onClick={(e) => taskFilter(e)} id={id} className={className}>
            {id}
          </button>
        </li>
      )
    })
    return (
      <>
        <ul className="filters">{filters}</ul>
        <button onClick={() => clearCompleted()} className="clear-completed">
          Clear completed
        </button>
      </>
    )
  }
}
