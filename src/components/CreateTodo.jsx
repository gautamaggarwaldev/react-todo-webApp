/* eslint-disable no-unused-vars */
import React from 'react';
import { v4 as uuid } from 'uuid';

// function to create a new todo
function CreateTodo({ todoName, setTodos, todos, setTodoName }) {
  const handleCreateTodo = (e) => {
    e.preventDefault();
    const newTodo = { id: uuid(), todoName: todoName };

    setTodos((preVal) => [newTodo, ...preVal]);
    localStorage.setItem('Todos', JSON.stringify([newTodo, ...todos])); //save todo in browser local storage

    setTodoName("");
  };

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={(e) => handleCreateTodo(e)}
        className="flex items-center space-x-2"
      >
        <input
          type="text"
          placeholder="Write Your Todo"
          onChange={(e) => setTodoName(e.target.value)}
          value={todoName}
          required
          className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Create Todo
        </button>
      </form>
    </div>
  );
}

export default CreateTodo;
