import React from 'react'
import { forwardRef } from 'react'

import InputLabel from '../InputLabel/InputLabel'

const TimeSelect = forwardRef((props, ref) => {
  return (
    <div>
      <InputLabel htmlFor="time">Horário</InputLabel>
      <select
        id="time"
        className="w-full rounded-lg border border-solid border-brand-text-gray px-4 py-3 text-sm outline-brand-primary placeholder:text-brand-text-gray"
        ref={ref}
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
})

TimeSelect.displayName = 'TimeSelect'

export default TimeSelect
