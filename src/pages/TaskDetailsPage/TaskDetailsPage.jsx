import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import {
  ArrowLeft,
  ChevronRight,
  LoaderIcon,
  Trashcon,
} from '../../assets/icons/index'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import Sidebar from '../../components/Sidebar/Sidebar'
import TimeSelect from '../../components/TimeSelect/TimeSelect'

const TaskDetailsPage = () => {
  const queryClient = useQueryClient()
  const { taskId } = useParams()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const { data: task } = useQuery({
    queryKey: ['tasks', taskId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/ITENS/${taskId}`, {
        method: 'GET',
      })
      const data = await response.json()
      reset(data)
    },
  })

  const { mutate: deleteTask, isPending: updateTaskSloading } = useMutation({
    mutationKey: ['deleteTask', taskId],
    mutationFn: async () => {
      const response = await fetch(` http://localhost:3000/ITENS/${taskId} `, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error()
      }
      const deleteTask = await response.json()
      queryClient.setQueryData('ITENS', (oldTasks) => {
        return oldTasks.filter((delTasks) => delTasks.id !== deleteTask.id)
      })
    },
  })

  const { mutate: updateTask, isPending: deleteTaskSloading } = useMutation({
    mutationKey: ['updateTask', taskId],
    mutationFn: async (data) => {
      const response = await fetch(` http://localhost:3000/ITENS/${taskId} `, {
        method: 'PATCH',
        body: JSON.stringify({
          title: data.title.trim(),
          time: data.time.trim(),
          description: data.description.trim(),
        }),
      })
      if (!response.ok) {
        throw new Error()
      }
      const updateTask = await response.json()
      queryClient.setQueryData('ITENS', (oldTasks) => {
        return oldTasks.map((oldUpdate) => {
          if (oldUpdate.id === taskId) {
            return updateTask
          }
          return oldUpdate
        })
      })
    },
  })

  const handleSaveClick = async (data) => {
    updateTask(data, {
      onSuccess: () => {
        toast.success('Tarefa atualizada com sucesso!')
        navigate(-1)
      },
      onError: () => toast.error('Ocorreu um erro ao atualizar a tarefa.'),
    })
  }

  const handleDeleteDetails = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success('Tarefa deletada com sucesso!.')
        navigate(-1)
      },
      onError: () => toast.error('Ocorreu um erro ao deletar a tarefa.'),
    })
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-2 px-8 py-16">
        <Link
          to="/"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
        >
          <ArrowLeft />
        </Link>
        <div className="flex w-full items-center justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <p className="text-sm text-brand-text-gray">Minhas Tarefas</p>
              <ChevronRight className="text-brand-text-gray" />
              <p className="text-sm font-semibold text-brand-primary">
                {task?.title}
              </p>
            </div>
            <p className="text-xl font-semibold text-brand-dark-blue">
              {task?.title}
            </p>
          </div>
          <Button
            variant="danger"
            className="self-end"
            onClick={handleDeleteDetails}
          >
            <p className="text-[15px] font-semibold">Deletar tarefa</p>
            <Trashcon />
          </Button>
        </div>

        <form onSubmit={handleSubmit(handleSaveClick)}>
          <div className="relative top-6 space-y-6 rounded-xl bg-brand-white p-6">
            <div>
              <Input
                id="title"
                label="Nome"
                defaultValue={task?.title}
                errorMessage={errors?.title?.message}
                {...register('title', {
                  required: 'O título é obrigatório',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'O título nao pode ser vazio.'
                    }
                  },
                })}
              />
            </div>
            <div>
              <TimeSelect
                id="time"
                errorMessage={errors?.time?.message}
                defaultValue={task?.time}
                {...register('time', {
                  required: 'O horário é obrigatório',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'O horário não pode ser vazio'
                    }
                  },
                })}
              />
            </div>
            <div>
              <Input
                id="description"
                label="Descrição"
                defaultValue={task?.description}
                errorMessage={errors?.description?.message}
                {...register('description', {
                  required: 'A descrição é obrigatório',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'A descrição não pode ser vazia'
                    }
                  },
                })}
              />
            </div>
          </div>
          <div className="relative top-8 flex w-full justify-end gap-3">
            <Button
              variant="primary"
              disabled={updateTaskSloading || deleteTaskSloading}
            >
              {(updateTaskSloading || deleteTaskSloading) && (
                <LoaderIcon className="animate-spin" />
              )}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskDetailsPage
