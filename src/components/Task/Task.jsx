import { CloudIcon, MoonIcon, SunIcon } from '../../assets/icons'
import { useGetTasks } from '../../hooks/data/use-get-tasks'
import Header from '../Header/Header'
import TaskItem from '../TaskItem/TaskItem'
import TaskSeparator from '../TaskSeparator/TaskSeparator'

const Task = () => {
  const { data: tasks } = useGetTasks()

  const morningTasks = tasks?.filter((items) => items.time === 'morning')
  const afterTasks = tasks?.filter((items) => items.time === 'afternoon')
  const eveningTasks = tasks?.filter((items) => items.time === 'evening')

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
            <TaskItem key={task.id} taskItens={task} />
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
            <TaskItem key={task.id} taskItens={task} />
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
            <TaskItem key={task.id} taskItens={task} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Task
