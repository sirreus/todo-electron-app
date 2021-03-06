import React, { useState, useEffect } from 'react'
import Form from '../components/Form'
import List from '../components/List'
import { ITodo } from '../interfaces'

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('todos') || '[]') as ITodo[]
    setTodos(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addHandler = (title: string) => {
    const newTodo: ITodo = {
      title: title,
      id: Date.now(),
      completed: false,
    }
    setTodos((prev) => [newTodo, ...prev])
  }

  const toggleHandler = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
  }

  const removeHandler = (id: number) => {
    const isSure = window.confirm('Are you sure?')
    if (isSure) {
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
    }
  }

  return (
    <>
      <Form onAdd={addHandler} />
      <List todos={todos} onRemove={removeHandler} onToggle={toggleHandler} />
    </>
  )
}

export default Todo
