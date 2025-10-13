import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import {
  CheckedIcon,
  DetailsIcon,
  LoaderIcon,
  Trashcon,
} from '../../assets/icons'
import { useDeleteTasks } from '../../hooks/data/use-delete-tasks'
import { useUpdateTasks } from '../../hooks/data/use-update-tasks'
import Button from '../Button/Button'

const TaskItem = ({ taskItens }) => {
  const { mutate: deleteTask, isPending } = useDeleteTasks(taskItens.id)

  const { mutate: updateTask } = useUpdateTasks(taskItens.id)

  const handleOnDeleteClick = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success('Tarefa deletada com sucesso!')
      },
      onError: () => {
        toast.error('Erro ao deletar tarefa. Por favor, tente novamente.')
      },
    })
  }

  const getNewStatus = () => {
    if (taskItens.status === 'not-started') {
      return 'in-progress'
    }
    if (taskItens.status === 'in-progress') {
      return 'done'
    }
    return 'not-started'
  }

  const handleCheckboxClick = () => {
    updateTask(
      {
        status: getNewStatus(),
      },
      {
        onSuccess: () => {
          toast.success('Status da tarefa atualizada com sucesso!')
        },
        onError: () =>
          toast.error('Erro ao atualizar tarefa. Por favor, tente novamente. '),
      }
    )
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
            onChange={handleCheckboxClick}
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
