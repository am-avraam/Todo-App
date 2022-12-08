import { useState } from 'react'
import './NewTaskForm.css'

const NewTaskForm = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('')
  const [inputMinute, setInputMinute] = useState('')
  const [inputSeconds, setInputSeconds] = useState('')

  const useInputReset = () => {
    setInputValue('')
    setInputMinute('')
    setInputSeconds('')
  }

  const onInputChange = (e) => {
    // слушает введенный инпут, вносит в state компонента
    const textInput = document.querySelector('.new-todo')
    const minInput = document.querySelectorAll('.new-todo-form__timer')[0]
    const secInput = document.querySelectorAll('.new-todo-form__timer')[1]
    let res = e.target.value

    let numberValidation = Number.isInteger(+res)
    let valueValidation = res.length < 3

    let branch
    e.target == textInput
      ? setInputValue(res)
      : e.target == minInput && numberValidation && valueValidation
      ? setInputMinute(res)
      : e.target == secInput && numberValidation && valueValidation
      ? setInputSeconds(res)
      : null
    if (!branch) return
  }

  const onSubmit = (e) => {
    // слушает сабмит - вносит state компонента в функцию добавления задачи и обнуляет инпут
    e.preventDefault()
    onAdd(inputValue, inputMinute, inputSeconds)
    useInputReset()
  }

  return (
    <header className="header">
      <h1>todos</h1>

      <form className="new-todo-form" onSubmit={onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={onInputChange}
          value={inputValue}
        />
        <input
          className="new-todo-form__timer"
          value={inputMinute}
          onChange={onInputChange}
          placeholder="Min"
          autoFocus
        ></input>
        <input
          className="new-todo-form__timer"
          value={inputSeconds}
          onChange={onInputChange}
          placeholder="Sec"
          autoFocus
        ></input>
        <button className="task-add__button">Add task</button>
      </form>
    </header>
  )
}

export default NewTaskForm
