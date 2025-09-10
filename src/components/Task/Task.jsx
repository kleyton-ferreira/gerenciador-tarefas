import React, { useState } from 'react'

import ITENS from '../../../constants/ITENS'
import {
  AddIcon,
  CloudIcon,
  MoonIcon,
  SunIcon,
  Trashcon,
} from '../../assets/icons'
import Button from '../Button/Button'
import TaskItem from '../TaskItem/TaskItem'
import TaskSeparator from '../TaskSeparator/TaskSeparator'

const Task = () => {
  const [tasks, setTasks] = useState(ITENS)

  const morningTasks = tasks.filter((items) => items.time === 'morning')
  const afterTasks = tasks.filter((items) => items.time === 'afternoon')
  const eveningTasks = tasks.filter((items) => items.time === 'evening')

  const handleTaskCheckboxClick = (taskId) => {
    const newTask = tasks.map((item) => {
      if (item.id !== taskId) {
        return item
      }
      if (item.status === 'not-started') {
        return { ...item, status: 'in-progress' }
      }
      if (item.status === 'in-progress') {
        return { ...item, status: 'done' }
      }
      if (item.status === 'done') {
        return { ...item, status: 'not-started' }
      }
      return item
    })
    setTasks(newTask)
  }

  return (
    <div className="w-full px-8 py-16">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[14px] font-semibold text-brand-primary">
            Minhas Tarefas
          </h2>
          <h3 className="text-[24px] font-semibold text-brand-dark-blue">
            Minhas Tarefas
          </h3>
        </div>
        <div className="flex items-center gap-6">
          <Button variant="secondary">
            Limpar tarefas <Trashcon />
          </Button>
          <Button variant="primary">
            <AddIcon /> Nova tarefa
          </Button>
        </div>
      </div>
      <div className="mt-6 rounded-[10px] bg-brand-white p-6">
        <div className="space-y-3">
          <TaskSeparator title="Manhã" icon={<SunIcon />} />
          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              taskItens={task}
              handTaskleClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
        <div className="my-8 space-y-3">
          <TaskSeparator title="Tarde" icon={<CloudIcon />} />
          {afterTasks.map((task) => (
            <TaskItem
              key={task.id}
              taskItens={task}
              handTaskleClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
        <div className="space-y-3">
          <TaskSeparator title="Noite" icon={<MoonIcon />} />
          {eveningTasks.map((task) => (
            <TaskItem
              key={task.id}
              taskItens={task}
              handTaskleClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Task
