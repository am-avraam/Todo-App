import './TasksFilter.css'

const TasksFilter = ({ taskFilter, clearCompleted, filterSelect }) => {
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

export default TasksFilter
