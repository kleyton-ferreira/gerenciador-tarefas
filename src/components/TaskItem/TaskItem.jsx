import React from 'react'

import { CheckedIcon, DetailsIcon, LoaderIcon } from '../../assets/icons'

const TaskItem = ({ taskItens, handTaskleClick }) => {
  const getStatusClass = () => {
    if (taskItens.status === 'done') {
      return 'bg-brand-primary  text-brand-primary'
    }
    if (taskItens.status === 'in-progress') {
      return 'bg-brand-process  text-brand-process'
    }

    if (taskItens.status === 'not-started') {
      return 'bg-brand-text-gray bg-opacity-15 text-brand-text-gray'
    }
  }

  return (
    <div
      className={`flex items-center justify-between rounded-[10px] bg-opacity-10 p-3 ${getStatusClass()}`}
    >
      <div className="flex items-center gap-3">
        <label
          className={`relative z-10 flex h-7 w-7 cursor-pointer rounded-lg px-4 py-3 text-sm ${getStatusClass()})}`}
        >
          <input
            type="checkbox"
            checked={taskItens.status === 'done'}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={() => handTaskleClick(taskItens.id)}
          />
          {taskItens.status === 'done' && (
            <CheckedIcon className="absolute right-2 top-2" />
          )}
          {taskItens.status === 'in-progress' && (
            <LoaderIcon className="absolute right-2 top-2 animate-spin text-brand-white" />
          )}
        </label>
        <p>{taskItens.title}</p>
      </div>
      <a href="#">
        <DetailsIcon className="text-brand-text-gray transition-all hover:opacity-80" />
      </a>
    </div>
  )
}

export default TaskItem
