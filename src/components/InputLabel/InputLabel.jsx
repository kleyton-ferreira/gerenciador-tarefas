import React from 'react'

const InputLabel = (props) => {
  return (
    <div>
      <label className="mb-1 flex text-sm font-semibold" {...props}>
        {props.children}
      </label>
    </div>
  )
}

export default InputLabel
