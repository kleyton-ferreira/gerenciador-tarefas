import React from 'react'

import InputLabel from '../InputLabel/InputLabel'

const Input = ({ label, ...rest }) => {
  return (
    <div>
      <InputLabel htmlFor={rest.id}> {label} </InputLabel>
      <input
        type="text"
        className="w-full rounded-lg border border-solid border-brand-text-gray px-4 py-3 text-sm outline-brand-primary placeholder:text-brand-text-gray"
        {...rest}
      />
    </div>
  )
}

export default Input
