import '../AddTaskDialog/AddTaskDialog.css'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import { CSSTransition } from 'react-transition-group'
import { toast } from 'sonner'
import { v4 } from 'uuid'

import { LoaderIcon } from '../../assets/icons/index'
import { useAddTasks } from '../../hooks/data/use-add-tasks'
import Button from '../Button/Button'
import Input from '../Input/Input'
import TimeSelect from '../TimeSelect/TimeSelect'

const AddTaskDialog = ({ isOpen, handleClose }) => {
  const nodeRef = useRef()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const { mutate } = useAddTasks()

  const handleSaveClick = async (data) => {
    const taskTitle = {
      id: v4(),
      time: data.time.trim(),
      title: data.title.trim(),
      description: data.description.trim(),
      status: 'not-started',
    }

    mutate(taskTitle, {
      onSuccess: () => {
        reset({
          title: '',
          time: 'morning',
          description: '',
        })
        toast.success('Tarefa adicionada com sucesso!')
        handleClose()
      },
      onError: () =>
        toast.error('Erro ao adicionar tarefa. por favor, tente novamente.'),
    })
  }

  const handleCancelClick = () => {
    reset({
      title: '',
      time: 'morning',
      description: '',
    })
    handleClose()
  }

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

              <form onSubmit={handleSubmit(handleSaveClick)}>
                <div className="space-y-4">
                  <Input
                    id="title"
                    label="Título"
                    placeholder="Título da tarefa"
                    errorMessage={errors?.title?.message}
                    {...register('title', {
                      required: 'O título é obrigatório',
                      validate: (value) => {
                        if (!value.trim()) {
                          return 'O título não pode ser vazio.'
                        }
                      },
                    })}
                  />

                  <TimeSelect
                    id="time"
                    errorMessage={errors?.time?.message}
                    {...register('time', {
                      required: 'O horário é obrigatório',
                      validate: (value) => {
                        if (!value.trim()) {
                          return 'O horário não pode ser vazio'
                        }
                      },
                    })}
                  />

                  <Input
                    id="description"
                    label="Descrição"
                    placeholder="Descreva a tarefa"
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
                <div className="mt-6 flex items-center justify-center gap-3">
                  <Button
                    variant="tertiary"
                    size="larger"
                    className="flex items-center justify-center"
                    type="button"
                    onClick={handleCancelClick}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="small"
                    variant="primary"
                    className="flex items-center justify-center"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && <LoaderIcon className="animate-spin" />}
                    Salvar
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}

export default AddTaskDialog
