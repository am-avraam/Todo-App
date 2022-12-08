import './Footer.css'
import TasksFilter from '../TasksFilter/TasksFilter'

const Footer = ({ filterSelect, count, filter, clearCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{count} items left</span>
      <TasksFilter taskFilter={filter} clearCompleted={clearCompleted} filterSelect={filterSelect} />
    </footer>
  )
}

export default Footer
