import React from 'react'

const InputMessageError = ({ children }) => {
  return (
    <div>
      <p className="pt-2 text-left text-red-500">{children}</p>
    </div>
  )
}

export default InputMessageError
