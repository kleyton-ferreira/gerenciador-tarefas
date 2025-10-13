import {
  CheksIcon,
  GlassWaterIcon,
  LoaderIcon,
  Task2Icon,
} from '../../assets/icons/index'
import DashboardCards from '../../components/DashboardCards/DashboardCards'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useGetTasks } from '../../hooks/data/use-get-tasks'

const Home = () => {
  const { data: tasks } = useGetTasks()

  const inProgressTasks = tasks?.filter(
    (task) => task.status === 'in-progress'
  ).length
  const completedTasks = tasks?.filter((task) => task.status === 'done').length

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full px-8 py-16">
        <Header subtitle="Dashboard" title="Dashboard" />
        <div className="grid grid-cols-4 gap-9">
          <DashboardCards
            icon={<Task2Icon />}
            numberText={tasks?.length}
            secundaryText="Tarefas disponíveis"
          />
          <DashboardCards
            icon={<CheksIcon />}
            numberText={completedTasks}
            secundaryText="Tarefas concluídas"
          />
          <DashboardCards
            icon={<LoaderIcon />}
            numberText={inProgressTasks}
            secundaryText="Tarefas em andamento"
          />
          <DashboardCards
            icon={<GlassWaterIcon />}
            numberText="40%"
            secundaryText="Água"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
