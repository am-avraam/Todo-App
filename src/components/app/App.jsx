import { Component } from 'react'
import PropTypes from 'prop-types'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'

import './App.css'

export default class App extends Component {
  static propTypes = {
    state: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)),
    todoData: PropTypes.arrayOf(
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
    todoCount: PropTypes.number,
    maxId: PropTypes.number,
    createTask: PropTypes.func,
    deleteTask: PropTypes.func,
    addTask: PropTypes.func,
    toggleProperty: PropTypes.func,
    onToggleDone: PropTypes.func,
    updateTask: PropTypes.func,
    clearCompleted: PropTypes.func,
    onToggleEdit: PropTypes.func,
    taskFilter: PropTypes.func,
  }

  maxId = 0

  createTask(task) {
    //  создает Task, устанавливая дефолтные значения пропсов и введеный инпут
    return {
      taskName: task,
      id: this.maxId++,
      dateBirth: new Date(),
      completed: false,
      edit: false,
      hidden: false,
      input: null,
    }
  }

  state = {
    todoData: [this.createTask('Позвонить Солу'), this.createTask('Залечь на дно'), this.createTask('в Брюгге')],
    filterSelect: [
      { selected: true, id: 'All' },
      { selected: false, id: 'Active' },
      { selected: false, id: 'Completed' },
    ],
  }

  deleteTask = (id) => {
    // удаляет Task из списка, меняя state
    this.setState(({ todoData }) => {
      let resArr = [...todoData].filter((el) => el.id != id)
      return {
        todoData: resArr,
      }
    })
  }

  addTask = (input) => {
    // добавляет Task в список, меняя state
    if (input.length > 0 && input.trim().length > 0) {
      let newItem = this.createTask(input)
      if (this.state.filterSelect.find((filter) => filter.selected).id === 'Completed') {
        newItem = { ...newItem, hidden: true }
      }

      this.setState(({ todoData }) => {
        const newArray = [...todoData, newItem]
        return {
          todoData: newArray,
        }
      })
    }
  }

  toggleProperty = (arr, id, property, property2 = null) => {
    // устанавливает противоположное булево значение определенного пропса (опционально двух пропсов)
    let newArr = arr.map((element) => {
      if (element.id === id) {
        element = { ...element, [property]: !element[property], [property2]: !element[property2] }
      }
      return element
    })
    return newArr
  }

  onToggleDone = (id) => {
    // переводит задачу в статус Completed и прячет ее в зависимости от фильтра
    this.setState(({ todoData }) => {
      if (this.state.filterSelect.find((filter) => filter.selected).id !== 'All') {
        return { todoData: this.toggleProperty(todoData, id, 'completed', 'hidden') }
      }
      return { todoData: this.toggleProperty(todoData, id, 'completed') }
    })
  }

  updateTask = (e) => {
    // обновляет название задачи по введенному инпуту
    if (e.keyCode === 13) {
      if (e.target.value.length > 0) {
        const id = e.currentTarget.parentNode.getAttribute('id')
        const newEl = this.createTask(e.target.value)

        this.setState(({ todoData }) => {
          let newArr = todoData.map((el) => {
            if (el.id === +id) {
              el = newEl
            }
            return el
          })
          return { todoData: newArr }
        })
      }
    }
  }

  clearCompleted = () => {
    // удаляет все задачи с true completed
    this.setState(({ todoData }) => {
      let newArr = [...todoData]
      let resArr = newArr.filter((el) => el.completed === false)
      return { todoData: resArr }
    })
  }

  onToggleEdit = (id) => {
    // передает пропсу edit значение true
    this.setState(({ todoData }) => {
      return { todoData: this.toggleProperty(todoData, id, 'edit') }
    })
  }

  onToggleSelectReset = () => {
    // сбрасывает выбранный фильтр
    this.setState(({ filterSelect }) => {
      let filtCopy = [...filterSelect]

      return {
        filterSelect: filtCopy.map((el) => {
          el.selected = false
          return el
        }),
      }
    })
  }

  onToggleSelecet = (id) => {
    // переводит филтр в активный selected
    this.setState(({ filterSelect }) => {
      if (filterSelect.find((el) => el.id === id).selected === false) {
        return { filterSelect: this.toggleProperty(filterSelect, id, 'selected') }
      }
    })
  }

  taskFilter = (e) => {
    // фильтрует задачи в зависимости от нажатой кнопки
    if (e.target.innerHTML === 'All') {
      this.onToggleSelectReset()
      this.onToggleSelecet(e.target.id)
      this.setState(({ todoData }) => {
        let newArr = [...todoData]
        newArr.map((el) => {
          el.hidden = false
          return el
        })
        return { todoData: newArr }
      })
    } else if (e.target.innerHTML === 'Active') {
      this.onToggleSelectReset()
      this.onToggleSelecet(e.target.id)
      this.setState(({ todoData }) => {
        let newArr = [...todoData]
        newArr.map((el) => {
          el.hidden = false
          if (el.completed === true) {
            el.hidden = true
            return el
          }
          return el
        })

        return { todoData: newArr }
      })
    } else if (e.target.innerHTML === 'Completed') {
      this.onToggleSelectReset()
      this.onToggleSelecet(e.target.id)
      this.setState(({ todoData }) => {
        let newArr = [...todoData]
        newArr.map((el) => {
          el.hidden = false
          if (el.completed === false) {
            el.hidden = true
            return el
          }
          return el
        })

        return { todoData: newArr }
      })
    }
  }

  render() {
    const { todoData } = this.state
    const { filterSelect } = this.state
    const todoCount = todoData.filter((el) => !el.completed).length

    return (
      <section className="todoapp">
        <NewTaskForm onAdd={this.addTask} />
        <section className="main">
          <TaskList
            todos={todoData}
            onDeleted={this.deleteTask}
            onToggleDone={this.onToggleDone}
            onToggleEdit={this.onToggleEdit}
            filter={this.taskFilter}
            updateTask={this.updateTask}
          />
          <Footer
            todoData={todoData}
            filterSelect={filterSelect}
            count={todoCount}
            filter={this.taskFilter}
            deleteTask={this.deleteTask}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    )
  }
}
