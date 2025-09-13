import '../AddTaskDialog/AddTaskDialog.css'

import React, { useRef } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import Button from '../Button/Button'
import Input from '../Input/Input'
import InputLabel from '../InputLabel/InputLabel'

const AddTaskDialog = ({ isOpen, handleClose }) => {
  const nodeRef = useRef()
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 z-40 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            <div className="relative w-80 rounded-[12px] bg-brand-white p-5 text-center shadow">
              <h2 className="text-[20px] font-semibold text-brand-dark-blue">
                Nova Tarefa
              </h2>
              <p className="mb-6 text-sm font-light text-brand-text-gray">
                Insira as informações abaixo
              </p>
              <div className="space-y-6">
                <Input
                  id="title"
                  label="Título"
                  placeholder="Título da tarefa"
                />

                <div>
                  <InputLabel htmlFor="time">Horário</InputLabel>
                  <select
                    id="time"
                    className="w-full rounded-lg border border-solid border-brand-text-gray px-4 py-3 text-sm outline-brand-primary placeholder:text-brand-text-gray"
                  >
                    <option value="">Manhã</option>
                    <option value="">Tarde</option>
                    <option value="">Noite</option>
                  </select>
                </div>

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                />
              </div>
              <div className="mt-6 flex items-center justify-center gap-3">
                <Button
                  variant="tertiary"
                  size="larger"
                  className="flex items-center justify-center"
                  onClick={handleClose}
                >
                  Cancelar
                </Button>
                <Button
                  size="small"
                  variant="primary"
                  className="flex items-center justify-center"
                >
                  Salvar
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}

export default AddTaskDialog
