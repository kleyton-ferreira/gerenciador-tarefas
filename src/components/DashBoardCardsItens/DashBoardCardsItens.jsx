import { CheksIcon, LoaderIcon, Task2Icon } from '../../assets/icons/index'
import { useGetTasks } from '../../hooks/data/use-get-tasks'
import DashboardCards from '../DashboardCards/DashboardCards'

const DashBoardCardsItens = () => {
  const { data: tasks } = useGetTasks()

  const notStartedTasks = tasks?.filter(
    (task) => task.status === 'not-started'
  ).length

  const inProgressTasks = tasks?.filter(
    (task) => task.status === 'in-progress'
  ).length
  const completedTasks = tasks?.filter((task) => task.status === 'done').length

  return (
    <div>
      <div className="grid grid-cols-4 gap-9">
        <DashboardCards
          icon={<Task2Icon />}
          numberText={tasks?.length}
          secundaryText="Tarefas disponíveis"
        />
        <DashboardCards
          icon={<CheksIcon />}
          numberText={notStartedTasks}
          secundaryText="Tarefas não iniciada"
        />

        <DashboardCards
          icon={<LoaderIcon />}
          numberText={inProgressTasks}
          secundaryText="Tarefas em andamento"
        />
        <DashboardCards
          icon={<LoaderIcon />}
          numberText={completedTasks}
          secundaryText="Tarefas concluídas"
        />
      </div>
    </div>
  )
}

export default DashBoardCardsItens
