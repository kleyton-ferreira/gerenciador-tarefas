import DashBoardCardsItens from '../../components/DashBoardCardsItens/DashBoardCardsItens'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import TaskItem from '../../components/TaskItem/TaskItem'
import { useGetTasks } from '../../hooks/data/use-get-tasks'

const Home = () => {
  const { data: tasks } = useGetTasks()
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full px-8 py-16">
        <Header subtitle="Dashboard" title="Dashboard" />
        <DashBoardCardsItens />
        <div className="grid gap-3">
          <div className="mt-6 overflow-hidden rounded-[10px] bg-brand-white p-6">
            <h3 className="text-xl font-extrabold text-brand-dark-blue">
              Tarefas
            </h3>
            <p className="text-sm text-brand-text-gray">
              Resumo das tarefas disponíveis
            </p>
            <div className="space-y-4">
              {tasks?.map((task) => (
                <TaskItem key={task.id} taskItens={task} />
              ))}
            </div>
          </div>
          <div className="rounded-[10px] bg-brand-white p-8 text-center">
            <p className="text-sm text-brand-text-gray">
              Passo a passo, Tarefa a tarefa, você transforma o seu dia em
              conquistas!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
