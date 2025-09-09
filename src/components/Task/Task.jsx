import React from 'react'

import { AddIcon, Trashcon } from '../../assets/icons'
import Button from '../Button/Button'

const Task = () => {
  return (
    <div className="w-full px-8 py-16">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[14px] font-semibold text-brand-primary">
            Minhas Tarefas
          </h2>
          <h3 className="text-[24px] font-semibold text-brand-dark-blue">
            Minhas Tarefas
          </h3>
        </div>
        <div className="flex items-center gap-6">
          <Button variant="secondary">
            Limpar tarefas <Trashcon />
          </Button>
          <Button variant="primary">
            <AddIcon /> Nova tarefa
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Task
