import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './footer.css'
import TasksFilter from '../tasks-filter/tasks-filter'

export default class Footer extends Component {
  static defaultProps = {
    count: () => {
      console.log('Функция не передана')
    },
    filter: () => {
      console.log('Функция не передана')
    },
    clearCompleted: () => {
      console.log('Функция не передана')
    },
  }

  static propTypes = {
    count: PropTypes.number,
    filter: PropTypes.func,
    clearCompleted: PropTypes.func,
  }

  render() {
    const { count, filter, clearCompleted } = this.props
    return (
      <footer className="footer">
        <span className="todo-count">{count} items left</span>
        <TasksFilter taskFilter={filter} clearCompleted={clearCompleted} />
      </footer>
    )
  }
}
