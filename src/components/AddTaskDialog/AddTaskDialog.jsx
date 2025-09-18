import '../AddTaskDialog/AddTaskDialog.css'

import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { v4 } from 'uuid'

import Button from '../Button/Button'
import Input from '../Input/Input'
import TimeSelect from '../TimeSelect/TimeSelect'

const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const [error, setError] = useState([])

  // ESSE ( useRef ) AQUI E PRA PEGAR O ELEMENTO HTML PARA A TRANSIÇAO  ...  createPortal!
  const nodeRef = useRef()

  // ESSA E UMA ABORDAGEM DE NAO USAR OS STATE PRA ATUALIZAR OS INPUTS! USA O  ...  forwardRef! PRA PEGAR O ATRIBUTO RAIS DO HTML
  const titleRef = useRef()
  const descriptionRef = useRef()
  const timeRef = useRef()

  const handleSaveClick = () => {
    const newError = []

    // E AQUI E SO PRA SIMPLIFICAR A ESCRITA NAS CONDICIONAIS  if (!title.trim())
    const title = titleRef.current.value
    const description = titleRef.current.value
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
    // AQUI A LIMPA OS INPUTS QUANDO DIGITAR NA CAIXA DE INPUT
    setError(newError)

    console.log(newError)
    if (newError.length > 0) {
      return
    }

    // AQUI E A FUNÇAO DE CRIAR A TAREFA QUE E É PASSADA COMO PROPS
    handleSubmit({
      id: v4(),
      title,
      time,
      description,
      status: 'not-started',
    })
    handleClose()
    // ESSE HANDLECLOSE..  ELE E A FUNÇAO QUE MUDA O ESTADO DE ABERTO E FECHADO ELE TA COM O VALOR (FALSE) QUANDO CLICA FICA FECHADO
  }

  const titleError = error.find((errors) => errors.inputName === 'title')
  const timeError = error.find((errors) => errors.inputName === 'time')
  const descriptionError = error.find(
    (errors) => errors.inputName === 'description'
  )

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
              <div className="space-y-4">
                <Input
                  id="title"
                  label="Título"
                  placeholder="Título da tarefa"
                  errorMessage={titleError?.message}
                  ref={titleRef}
                />

                <TimeSelect errorMessage={timeError?.message} ref={timeRef} />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  errorMessage={descriptionError?.message}
                  ref={descriptionRef}
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
                  onClick={handleSaveClick}
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
