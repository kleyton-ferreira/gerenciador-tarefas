import React from 'react'
import { forwardRef } from 'react'

import InputLabel from '../InputLabel/InputLabel'
import InputMessageError from '../InputMessageError/InputMessageError'

const Input = forwardRef(({ label, errorMessage, ...rest }, ref) => {
  return (
    <div>
      <InputLabel htmlFor={rest.id}> {label} </InputLabel>
      <input
        type="text"
        className="w-full rounded-lg border border-solid border-brand-text-gray px-4 py-3 text-sm outline-brand-primary placeholder:text-brand-text-gray"
        ref={ref}
        {...rest}
      />
      {errorMessage && <InputMessageError> {errorMessage} </InputMessageError>}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
