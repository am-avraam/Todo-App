import { useState } from 'react'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'

import './App.css'

function App() {
  let [newID, setID] = useState(0)

  const createTask = (task, timer = [0, '00']) => {
    setID((newID) => (newID = newID + 1))
    //  создает Task, устанавливая дефолтные значения пропсов и введеный инпут
    return {
      taskName: task,
      id: newID + 1,
      dateBirth: new Date(),
      completed: false,
      edit: false,
      hidden: false,
      input: null,
      timer: timer,
    }
  }

  // const [todoData, setTodoData] = useState([createTask('Позвонить'), createTask('Залечь'), createTask('Брюгге')])

  const [todoData, setTodoData] = useState([])

  const [filterSelect, setFilter] = useState([
    { selected: true, id: 'All' },
    { selected: false, id: 'Active' },
    { selected: false, id: 'Completed' },
  ])

  const deleteTask = (id) => {
    // удаляет Task из списка, меняя state
    setTodoData([...todoData].filter((el) => el.id != id))
  }

  const addTask = (inputValue, inputMinute, inputSeconds) => {
    // добавляет Task в список, меняя state
    let timer = inputMinute || inputSeconds ? [inputMinute, inputSeconds] : [0, 0]
    if (inputValue.length > 0 && inputValue.trim().length > 0) {
      let newItem = createTask(inputValue, timer)

      if (filterSelect.find((filter) => filter.selected).id === 'Completed') {
        newItem = { ...newItem, hidden: true }
      }

      setTodoData((todoData) => [...todoData, newItem])
    }
  }

  const toggleProperty = (arr, id, property, property2 = null) => {
    // устанавливает противоположное булево значение определенного пропса (опционально двух пропсов)
    let newArr = arr.map((element) => {
      if (element.id === id) {
        element = { ...element, [property]: !element[property], [property2]: !element[property2] }
      }
      return element
    })
    return newArr
  }

  const onToggleDone = (id) => {
    // переводит задачу в статус Completed и прячет ее в зависимости от фильтра
    setTodoData((todoData) => {
      if (filterSelect.find((filter) => filter.selected).id !== 'All') {
        return toggleProperty(todoData, id, 'completed', 'hidden')
      }
      return toggleProperty(todoData, id, 'completed')
    })
  }

  const updateTask = (e) => {
    if (e.keyCode === 13) {
      if (e.target.value.length > 0) {
        const id = e.currentTarget.parentNode.getAttribute('id')
        const newEl = createTask(e.target.value)

        setTodoData((todoData) => {
          let newArr = todoData.map((el) => {
            if (el.id === +id) {
              el = newEl
            }
            return el
          })
          return newArr
        })
      }
    }
  }

  const clearCompleted = () => {
    // удаляет все задачи с true completed
    setTodoData((todoData) => {
      let newArr = [...todoData]
      let resArr = newArr.filter((el) => el.completed === false)
      return resArr
    })
  }

  const onToggleEdit = (id) => {
    // передает пропсу edit значение true
    setTodoData((todoData) => {
      return toggleProperty(todoData, id, 'edit')
    })
  }

  const onToggleSelectReset = () => {
    // сбрасывает выбранный фильтр
    setFilter((filterSelect) => {
      return [...filterSelect].map((el) => {
        el.selected = false
        return el
      })
    })
  }

  const onToggleSelecet = (id) => {
    // переводит фильтр в активный selected
    setFilter((filterSelect) => {
      if (filterSelect.find((el) => el.id === id).selected === false) {
        return toggleProperty(filterSelect, id, 'selected')
      }
    })
  }

  const taskFilter = (e) => {
    // фильтрует задачи в зависимости от нажатой кнопки
    if (e.target.innerHTML === 'All') {
      onToggleSelectReset()
      onToggleSelecet(e.target.id)
      setTodoData((todoData) => {
        return [...todoData].map((el) => {
          el.hidden = false
          return el
        })
      })
    } else if (e.target.innerHTML === 'Active') {
      onToggleSelectReset()
      onToggleSelecet(e.target.id)
      setTodoData((todoData) => {
        return [...todoData].map((el) => {
          el.hidden = false
          if (el.completed === true) {
            el.hidden = true
            return el
          }
          return el
        })
      })
    } else if (e.target.innerHTML === 'Completed') {
      onToggleSelectReset()
      onToggleSelecet(e.target.id)
      setTodoData((todoData) => {
        return [...todoData].map((el) => {
          el.hidden = false
          if (el.completed === false) {
            el.hidden = true
            return el
          }
          return el
        })
      })
    }
  }

  const todoCount = todoData ? todoData.filter((el) => !el.completed).length : null

  return (
    <section className="todoapp">
      <NewTaskForm onAdd={addTask} />
      <section className="main">
        <TaskList
          todos={todoData}
          onDeleted={deleteTask}
          onToggleDone={onToggleDone}
          onToggleEdit={onToggleEdit}
          filter={taskFilter}
          updateTask={updateTask}
        />
        <Footer
          todoData={todoData}
          filterSelect={filterSelect}
          count={todoCount}
          filter={taskFilter}
          deleteTask={deleteTask}
          clearCompleted={clearCompleted}
        />
      </section>
    </section>
  )
}

export default App
