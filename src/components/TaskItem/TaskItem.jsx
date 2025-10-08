import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import {
  CheckedIcon,
  DetailsIcon,
  LoaderIcon,
  Trashcon,
} from '../../assets/icons'
import Button from '../Button/Button'

const TaskItem = ({ taskItens, handTaskleClick }) => {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationKey: ['deleteTask', taskItens.id],
    mutationFn: async () => {
      const response = await fetch(
        `http://localhost:3000/ITENS/${taskItens.id}`,
        {
          method: 'DELETE',
        }
      )
      return response.json()
    },
  })

  const handleOnDeleteClick = async () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.setQueriesData('ITENS', (currentTask) => {
          return currentTask.filter((taskDel) => taskDel.id !== taskItens.id)
        })
        toast.success('Tarefa deletada com sucesso!')
      },
      onError: () => {
        toast.error('Erro ao deletar tarefa. Por favor, tente novamente.')
      },
    })
  }

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

      <div className="flex items-center">
        <Button
          variant="ghost"
          onClick={handleOnDeleteClick}
          disabled={isPending}
        >
          {isPending ? <LoaderIcon className="animate-spin" /> : <Trashcon />}
        </Button>
        <Link to={`/task/${taskItens.id}`}>
          <DetailsIcon className="text-brand-text-gray transition-all hover:opacity-70" />
        </Link>
      </div>
    </div>
  )
}

export default TaskItem
