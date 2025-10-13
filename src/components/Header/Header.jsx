import { useState } from 'react'

import { AddIcon, Trashcon } from '../../assets/icons'
import AddTaskDialog from '../AddTaskDialog/AddTaskDialog'
import Button from '../Button/Button'

const Header = ({ subtitle, title }) => {
  const [addDialogModal, setAddDialogModal] = useState(false)
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-[14px] font-semibold text-brand-primary">
          {subtitle}
        </h2>
        <h3 className="text-[24px] font-semibold text-brand-dark-blue">
          {title}
        </h3>
      </div>
      <div className="flex items-center gap-6">
        <Button variant="secondary">
          Limpar tarefas <Trashcon />
        </Button>
        <Button variant="primary" onClick={() => setAddDialogModal(true)}>
          <AddTaskDialog isOpen={addDialogModal} />
          <AddIcon /> Nova tarefa
        </Button>

        <AddTaskDialog
          isOpen={addDialogModal}
          handleClose={() => setAddDialogModal(false)}
        />
      </div>
    </div>
  )
}

export default Header
