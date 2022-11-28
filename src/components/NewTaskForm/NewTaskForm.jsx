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
    inputMinute: '',
    inputSeconds: '',
  }

  onInputChange = (e) => {
    // слушает введенный инпут, вносит в state компонента
    const textInput = document.querySelector('.new-todo')
    const minInput = document.querySelectorAll('.new-todo-form__timer')[0]
    const secInput = document.querySelectorAll('.new-todo-form__timer')[1]
    let res = e.target.value

    let numberValidation = Number.isInteger(+res)
    let valueValidation = res.length < 3

    let branch
    e.target == textInput
      ? (branch = 'inputValue')
      : e.target == minInput && numberValidation && valueValidation
      ? (branch = 'inputMinute')
      : e.target == secInput && numberValidation && valueValidation
      ? (branch = 'inputSeconds')
      : null
    if (!branch) return
    this.setState(() => {
      return { [branch]: res }
    })
  }

  onSubmit = (e) => {
    // слушает сабмит - вносит state компонента в функцию добавления задачи и обнуляет инпут
    const { inputValue, inputMinute, inputSeconds } = this.state
    e.preventDefault()
    this.props.onAdd(inputValue, inputMinute, inputSeconds)
    this.setState({
      inputValue: '',
      inputMinute: '',
      inputSeconds: '',
    })
  }

  // componentDidUpdate(d, prevState) {

  // }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onChange={this.onInputChange}
            value={this.state.inputValue}
          />
          <input
            className="new-todo-form__timer"
            value={this.state.inputMinute}
            onChange={this.onInputChange}
            placeholder="Min"
            autoFocus
          ></input>
          <input
            className="new-todo-form__timer"
            value={this.state.inputSeconds}
            onChange={this.onInputChange}
            placeholder="Sec"
            autoFocus
          ></input>
          <button className="task-add__button">Add task</button>
        </form>
      </header>
    )
  }
}
