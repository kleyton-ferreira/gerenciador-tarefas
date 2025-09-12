import React from 'react'

const Input = ({ label, ...rest }) => {
  return (
    <div>
      <label htmlFor={rest.id} className="mb-1 flex text-sm font-semibold">
        {label}
      </label>
      <input
        type="text"
        className="w-full rounded-lg border border-solid border-brand-text-gray px-4 py-3 text-sm outline-brand-primary placeholder:text-brand-text-gray"
        {...rest}
      />
    </div>
  )
}

export default Input
