import React, { useEffect, useRef, useState } from 'react'
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
  const [errors, setErrors] = useState([])
  const [saveIsLoading, setSaveIsLoading] = useState(false)
  const { taskId } = useParams()
  const [task, setTask] = useState()

  const navigate = useNavigate()

  const titleRef = useRef()
  const descriptionRef = useRef()
  const timeRef = useRef()

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/ITENS/${taskId}`, {
        method: 'GET',
      })
      const data = await response.json()
      setTask(data)
    }
    fetchTask()
  }, [taskId])

  const handleSaveClick = async () => {
    setSaveIsLoading(true)
    const newError = []

    const title = titleRef.current.value
    const description = descriptionRef.current.value
    const time = timeRef.current.value

    if (!title.trim()) {
      newError.push({
        inputName: 'title',
        message: 'O título e obrigatório',
      })
    }

    if (!time.trim()) {
      newError.push({
        inputName: 'time',
        message: 'O Hórario e obrigatório',
      })
    }

    if (!description.trim()) {
      newError.push({
        inputName: 'description',
        message: 'A descrição e obrigatório',
      })
    }

    setErrors(newError)
    if (newError.length > 0) {
      return setSaveIsLoading(false)
    }

    const response = await fetch(` http://localhost:3000/ITENS/${task.id} `, {
      method: 'PATCH',
      body: JSON.stringify({
        title,
        description,
        time,
      }),
    })

    const newTask = await response.json()
    setTask(newTask)
    setSaveIsLoading(false)

    if (!response.ok) {
      toast.error('Ocorreu um erro ao atualizar a tarefa!')
      return setSaveIsLoading(false)
    }
    setSaveIsLoading(false)
  }

  const handleDeleteDetails = async () => {
    const response = await fetch(` http://localhost:3000/ITENS/${task.id} `, {
      method: 'DELETE',
    })
    if (!response.ok) {
      toast.error('Ocorreu um erro ao deletar a tarefa.')
      return setSaveIsLoading(false)
    }
    toast.success('Tarefa deletada com sucesso!.')
    return navigate(-1)
  }

  const titleError = errors.find((errors) => errors.inputName === 'title')
  const timeError = errors.find((errors) => errors.inputName === 'time')
  const descriptionError = errors.find(
    (errors) => errors.inputName === 'description'
  )

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
        <div className="relative top-6 space-y-6 rounded-xl bg-brand-white p-6">
          <div>
            <Input
              id="title"
              label="Nome"
              defaultValue={task?.title}
              errorMessage={titleError?.message}
              ref={titleRef}
            />
          </div>
          <div>
            <TimeSelect
              id="time"
              label=""
              defaultValue={task?.time}
              errorMessage={timeError?.message}
              ref={timeRef}
            />
          </div>
          <div>
            <Input
              id="description"
              label="Descrição"
              defaultValue={task?.description}
              errorMessage={descriptionError?.message}
              ref={descriptionRef}
            />
          </div>
        </div>
        <div className="relative top-8 flex w-full justify-end gap-3">
          {/* <Button variant="details">Cancelar</Button> */}
          <Button
            variant="primary"
            onClick={handleSaveClick}
            disabled={saveIsLoading}
          >
            {saveIsLoading && <LoaderIcon className="animate-spin" />}
            Salvar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage
