import React from 'react'

import InputLabel from '../InputLabel/InputLabel'

const TimeSelect = (props, error) => {
  return (
    <div>
      <InputLabel htmlFor="time">Horário</InputLabel>
      <select
        id="time"
        className="w-full rounded-lg border border-solid border-brand-text-gray px-4 py-3 text-sm outline-brand-primary placeholder:text-brand-text-gray"
        {...props}
      >
        {props.errorMessage && (
          <p className="pt-2 text-left text-red-500">{props.errorMessage}</p>
        )}
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>
    </div>
  )
}

export default TimeSelect
