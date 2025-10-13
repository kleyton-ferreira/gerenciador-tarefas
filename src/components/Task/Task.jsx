import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { CloudIcon, MoonIcon, SunIcon } from '../../assets/icons'
import { useGetTasks } from '../../hooks/data/use-get-tasks'
import { taskQueryKeys } from '../../keys/queries'
import Header from '../Header/Header'
import TaskItem from '../TaskItem/TaskItem'
import TaskSeparator from '../TaskSeparator/TaskSeparator'

const Task = () => {
  const queryClient = useQueryClient()
  const { data: tasks } = useGetTasks()

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
    queryClient.setQueryData(taskQueryKeys.getAll(), newTask)
  }

  return (
    <div className="w-full px-8 py-16">
      <Header subtitle="Minhas Tarefas" title="Minhas Tarefas" />
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
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Task
