import React, { useEffect, useState } from 'react'
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
  const { taskId } = useParams()
  const [task, setTask] = useState()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const navigate = useNavigate()

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/ITENS/${taskId}`, {
        method: 'GET',
      })
      const data = await response.json()
      setTask(data)
      reset(data)
    }
    fetchTask()
  }, [taskId, reset])

  const handleSaveClick = async (data) => {
    const response = await fetch(` http://localhost:3000/ITENS/${task.id} `, {
      method: 'PATCH',
      body: JSON.stringify({
        title: data.title.trim(),
        time: data.time.trim(),
        description: data.description.trim(),
      }),
    })

    const newTask = await response.json()
    setTask(newTask)

    if (!response.ok) {
      return toast.error('Ocorreu um erro ao atualizar a tarefa!')
    }
  }

  const handleDeleteDetails = async () => {
    const response = await fetch(` http://localhost:3000/ITENS/${task.id} `, {
      method: 'DELETE',
    })
    if (!response.ok) {
      return toast.error('Ocorreu um erro ao deletar a tarefa.')
    }
    toast.success('Tarefa deletada com sucesso!.')
    return navigate(-1)
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
                {...register('title', {
                  required: 'O título é obrigatório',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'O título nao pode ser vazio.'
                    }
                  },
                })}
                errorMessage={errors?.title?.message}
              />
            </div>
            <div>
              <TimeSelect
                id="time"
                label=""
                defaultValue={task?.time}
                {...register('time', {
                  required: 'O horário é obrigatório',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'O horário não pode ser vazio'
                    }
                  },
                })}
                errorMessage={errors?.time?.message}
              />
            </div>
            <div>
              <Input
                id="description"
                label="Descrição"
                defaultValue={task?.description}
                {...register('description', {
                  required: 'A descrição é obrigatório',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'A descrição não pode ser vazia'
                    }
                  },
                })}
                errorMessage={errors?.description?.message}
              />
            </div>
          </div>
          <div className="relative top-8 flex w-full justify-end gap-3">
            <Button variant="primary" disabled={isSubmitting}>
              {isSubmitting && <LoaderIcon className="animate-spin" />}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskDetailsPage
