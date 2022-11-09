import React, { Component } from "react";
import PropTypes from "prop-types";

import NewTaskForm from "../new-task-form/new-task-form";
import TaskList from "../task-list/task-list";
import Footer from "../footer/footer";

import "./app.css";

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
        input: PropTypes.oneOfType([
          PropTypes.object,
          PropTypes.number,
          PropTypes.string,
        ]),
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
  };

  maxId = 0;

  createTask(task) {
    return {
      taskName: task,
      id: this.maxId++,
      dateBirth: new Date(),
      completed: false,
      edit: false,
      hidden: false,
      input: null,
    };
  }

  state = {
    todoData: [
      this.createTask("Позвонить Солу"),
      this.createTask("Залечь на дно в Брюгге"),
      this.createTask("Достучаться до небес"),
    ],
  };

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  addTask = (input) => {
    if (input.length > 0) {
      const newItem = this.createTask(input);

      this.setState(({ todoData }) => {
        const newArray = [...todoData, newItem];
        return {
          todoData: newArray,
        };
      });
    }
  };

  toggleProperty = (arr, id, property) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldTask = arr[idx];
    const newTask = { ...oldTask, [property]: !oldTask[property] };

    return [...arr.slice(0, idx), newTask, ...arr.slice(idx + 1)];
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return { todoData: this.toggleProperty(todoData, id, "completed") };
    });
  };

  updateTask = (e) => {
    if (e.keyCode === 13) {
      if (e.target.value.length > 0) {
        const id = e.currentTarget.parentNode.getAttribute("id");
        const newEl = this.createTask(e.target.value);

        this.setState(({ todoData }) => {
          const idx = todoData.findIndex((el) => el.id === +id);

          let newArr = [
            ...todoData.slice(0, idx),
            newEl,
            ...todoData.slice(idx + 1),
          ];
          return { todoData: newArr };
        });
      }
    }
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      let newArr = [...todoData];
      let resArr = newArr.filter((el) => el.completed === false);
      return { todoData: resArr };
    });
  };

  onToggleEdit = (id) => {
    this.setState(({ todoData }) => {
      return { todoData: this.toggleProperty(todoData, id, "edit") };
    });
  };

  taskFilter = (e) => {
    if (e.target.innerHTML === "All") {
      this.setState(({ todoData }) => {
        let newArr = [...todoData];
        newArr.map((el) => {
          el.hidden = false;
          return el;
        });
        return { todoData: newArr };
      });
    } else if (e.target.innerHTML === "Active") {
      this.setState(({ todoData }) => {
        let newArr = [...todoData];
        newArr.map((el) => {
          el.hidden = false;
          if (el.completed === true) {
            el.hidden = true;
            return el;
          }
          return el;
        });

        return { todoData: newArr };
      });
    } else if (e.target.innerHTML === "Completed") {
      this.setState(({ todoData }) => {
        let newArr = [...todoData];
        newArr.map((el) => {
          el.hidden = false;
          if (el.completed === false) {
            el.hidden = true;
            return el;
          }
          return el;
        });

        return { todoData: newArr };
      });
    }
  };

  render() {
    const { todoData } = this.state;
    const todoCount = todoData.filter((el) => !el.completed).length;

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
            count={todoCount}
            filter={this.taskFilter}
            deleteTask={this.deleteTask}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}
