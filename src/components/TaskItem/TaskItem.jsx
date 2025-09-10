import React from 'react'

const TaskItem = ({ taskItens }) => {
  const getStatusClass = () => {
    if (taskItens.status === 'done') {
      return 'bg-brand-primary  text-brand-primary'
    }
    if (taskItens.status === 'in-progress') {
      return 'bg-brand-process  text-brand-process'
    }

    if (taskItens.status === 'not-started') {
      return 'bg-brand-text-gray  text-brand-text-gray'
    }
  }

  return (
    <div className={`rounded-[10px] bg-opacity-10 p-3 ${getStatusClass()}`}>
      <p>{taskItens.title}</p>
    </div>
  )
}

export default TaskItem
