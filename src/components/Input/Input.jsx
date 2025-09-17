import React from 'react'

import InputLabel from '../InputLabel/InputLabel'

const Input = ({ label, errorMessage, ...rest }) => {
  return (
    <div>
      <InputLabel htmlFor={rest.id}> {label} </InputLabel>
      <input
        type="text"
        className="w-full rounded-lg border border-solid border-brand-text-gray px-4 py-3 text-sm outline-brand-primary placeholder:text-brand-text-gray"
        {...rest}
      />
      {errorMessage && (
        <p className="pt-2 text-left text-red-500">{errorMessage}</p>
      )}
    </div>
  )
}

export default Input
