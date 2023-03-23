import React from 'react'

export default function Todos({todo, toggleTodo}) {

  function handleTodoClick(){
    toggleTodo(todo.id)
  }

  return (
    <div>
      <label>
        <input type="checkbox" checked={todo.complete} onChange={handleTodoClick}></input>
        {todo.name}
      </label>
    </div>
  )
}
