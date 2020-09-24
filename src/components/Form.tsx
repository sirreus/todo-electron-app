import React, { useRef } from 'react'

interface TodoFormProps {
  onAdd(title: string): void
}

const Form: React.FC<TodoFormProps> = (props) => {
  const refInp = useRef<HTMLInputElement>(null)

  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      props.onAdd(refInp.current!.value)
      refInp.current!.value = ''
    }
  }

  return (
    <div className="input-field mt2">
      <input
        ref={refInp}
        type="text"
        id="title"
        placeholder="Enter your task"
        onKeyPress={keyPressHandler}
      />
      <label htmlFor="title" className="active">
        Enter your task
      </label>
    </div>
  )
}

export default Form
