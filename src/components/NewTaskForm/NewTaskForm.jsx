import { Component } from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'

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
    // слушает введенный инпут, вносит в state компонента
    this.setState({
      inputValue: e.target.value,
    })
  }

  onSubmit = (e) => {
    // слушает сабмит - вносит state компонента в функцию добавления задачи и обнуляет инпут
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
