import { useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Await } from 'react-router-dom'
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
  const queryClient = useQueryClient()

  const { data: tasks } = useQuery({
    queryKey: 'ITENS',
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/ITENS', {
        method: 'GET',
      })
      const taskItems = await response.json()
      return taskItems
    },
  })

  const morningTasks = tasks?.filter((items) => items.time === 'morning')
  const afterTasks = tasks?.filter((items) => items.time === 'afternoon')
  const eveningTasks = tasks?.filter((items) => items.time === 'evening')

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
    queryClient.setQueryData('ITENS', newTask)
  }

  // FUNÇAO DE CRIAR TAREFAS
  const handleAddTaskSubmit = (taskSubmit) => {
    queryClient.setQueriesData('ITENS', (currentTask) => {
      return [...currentTask, taskSubmit]
    })
    toast.success('Tarefa adicionada com sucesso!')
  }

  // FUNÇAO DE DELETAR AS TAREFAS
  const onDeleteTaskSucesess = (taskId) => {
    queryClient.setQueriesData('ITENS', (currentTask) => {
      return currentTask.filter((taskDel) => taskDel.id !== taskId)
    })
    toast.success('Tarefa deletada com sucesso!')
  }

  const [addDialogModal, setAddDialogModal] = useState(false)

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
            onSubmitSucess={handleAddTaskSubmit}
          />
        </div>
      </div>
      <div className="mt-6 rounded-[10px] bg-brand-white p-6">
        <div className="space-y-3">
          <TaskSeparator title="Manhã" icon={<SunIcon />} />
          {morningTasks?.length === 0 && (
            <p className="text- text-brand-text-gray">
              Nenhuma tarefa cadastrada para o período da manhã.
            </p>
          )}
          {morningTasks?.map((task) => (
            <TaskItem
              key={task.id}
              taskItens={task}
              handTaskleClick={handleTaskCheckboxClick}
              onDeleteSucess={onDeleteTaskSucesess}
            />
          ))}
        </div>
        <div className="my-8 space-y-3">
          <TaskSeparator title="Tarde" icon={<CloudIcon />} />
          {afterTasks?.length === 0 && (
            <p className="text- text-brand-text-gray">
              Nenhuma tarefa cadastrada para o período da tarde.
            </p>
          )}
          {afterTasks?.map((task) => (
            <TaskItem
              key={task.id}
              taskItens={task}
              handTaskleClick={handleTaskCheckboxClick}
              onDeleteSucess={onDeleteTaskSucesess}
            />
          ))}
        </div>
        <div className="space-y-3">
          <TaskSeparator title="Noite" icon={<MoonIcon />} />
          {eveningTasks?.length === 0 && (
            <p className="text- text-brand-text-gray">
              Nenhuma tarefa cadastrada para o período da noite.
            </p>
          )}
          {eveningTasks?.map((task) => (
            <TaskItem
              key={task.id}
              taskItens={task}
              handTaskleClick={handleTaskCheckboxClick}
              onDeleteSucess={onDeleteTaskSucesess}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Task
