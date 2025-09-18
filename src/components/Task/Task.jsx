import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

import {
  AddIcon,
  CloudIcon,
  MoonIcon,
  SunIcon,
  Trashcon,
} from '../../assets/icons'
import AddTaskDialog from '../AddTaskDialog/AddTaskDialog'
import Button from '../Button/Button'
import TaskItem from '../TaskItem/TaskItem'
import TaskSeparator from '../TaskSeparator/TaskSeparator'

const Task = () => {
  const [tasks, setTasks] = useState([])
  const [addDialogModal, setAddDialogModal] = useState(false)

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('http://localhost:3000/ITENS', {
        method: 'GET',
      })
      const data = await response.json()
      setTasks(data)
    }
    fetchTasks()
  }, [])

  const morningTasks = tasks.filter((items) => items.time === 'morning')
  const afterTasks = tasks.filter((items) => items.time === 'afternoon')
  const eveningTasks = tasks.filter((items) => items.time === 'evening')

  // FUNÇAO DE MUDAR OS CHACKBOX
  const handleTaskCheckboxClick = (taskId) => {
    const newTask = tasks.map((item) => {
      if (item.id !== taskId) {
        return item
      }
      if (item.status === 'not-started') {
        toast.success('Tarefa iniciada com sucesso!')
        return { ...item, status: 'in-progress' }
      }
      if (item.status === 'in-progress') {
        toast.success('Tarefa concluida com sucesso!')
        return { ...item, status: 'done' }
      }
      if (item.status === 'done') {
        toast.success('Tarefa reiniciada com sucesso!')
        return { ...item, status: 'not-started' }
      }
      return item
    })
    setTasks(newTask)
  }

  // FUNÇAO DE DELETAR AS TAREFAS
  const handleDeleteTasks = (taskId) => {
    const deleteTask = tasks.filter((del) => del.id !== taskId)
    setTasks(deleteTask)
    toast.success('Tarefa deletada com sucesso!')
  }

  // FUNÇAO DE CRIAR TAREFAS
  const handleAddTaskSubmit = (taskSubmit) => {
    setTasks([...tasks, taskSubmit])
    toast.success('Tarefa adicionada com sucesso!')
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
          <Button variant="primary" onClick={() => setAddDialogModal(true)}>
            <AddTaskDialog isOpen={addDialogModal} />
            <AddIcon /> Nova tarefa
          </Button>

          <AddTaskDialog
            isOpen={addDialogModal}
            handleClose={() => setAddDialogModal(false)}
            handleSubmit={handleAddTaskSubmit}
          />
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
              handleDeletItens={handleDeleteTasks}
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
              handleDeletItens={handleDeleteTasks}
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
              handleDeletItens={handleDeleteTasks}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Task
