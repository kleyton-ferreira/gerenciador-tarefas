import React from 'react'
import { createPortal } from 'react-dom'

const AddTaskDialog = ({ isOpen }) => {
  if (!isOpen) return true
  return createPortal(
    <div className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center">
      <h1 className="text-[50px] text-brand-dark-blue">Add Task Dialog!</h1>
    </div>,
    document.body
  )
}

export default AddTaskDialog
