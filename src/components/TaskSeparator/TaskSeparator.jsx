import React from 'react'

const TaskSeparator = ({ title, icon }) => {
  return (
    <div className="flex items-center gap-2 border-b border-solid border-brand-light-gray pb-2">
      <span>{icon}</span>
      <p className="text-[14px] font-semibold text-brand-text-gray">{title}</p>
    </div>
  )
}

export default TaskSeparator
