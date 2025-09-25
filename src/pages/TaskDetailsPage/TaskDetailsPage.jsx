import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { ArrowLeft, ChevronRight, Trashcon } from '../../assets/icons/index'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import Sidebar from '../../components/Sidebar/Sidebar'
import TimeSelect from '../../components/TimeSelect/TimeSelect'

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate(-1)
  }

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

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-2 px-8 py-16">
        <button
          onClick={handleBackClick}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
        >
          <ArrowLeft />
        </button>
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
          <Button variant="danger" className="self-end">
            <p className="text-[15px] font-semibold">Deletar tarefa</p>
            <Trashcon />
          </Button>
        </div>
        <div className="relative top-6 space-y-6 rounded-xl bg-brand-white p-6">
          <div>
            <Input label="Nome" value={task?.title} />
          </div>
          <div>
            <TimeSelect label="" value={task?.time} />
          </div>
          <div>
            <Input label="Descrição" value={task?.description} />
          </div>
        </div>
        <div className="relative top-8 flex w-full justify-end gap-3">
          <Button variant="details">Cancelar</Button>
          <Button variant="primary">Salvar</Button>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage
