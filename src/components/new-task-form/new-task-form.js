import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

export default class NewTaskForm extends Component {
  static propTypes = {
    state: PropTypes.object,
    inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onInputChange: PropTypes.func,
    onSubmit: PropTypes.func,
  }

  state = {
    inputValue: '',
  }

  onInputChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onAdd(this.state.inputValue)
    this.setState({
      inputValue: '',
    })
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="task-add" onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onChange={this.onInputChange}
            value={this.state.inputValue}
          />
          <button className="task-add__button">Add task</button>
        </form>
      </header>
    )
  }
}
