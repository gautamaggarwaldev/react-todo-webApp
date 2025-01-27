/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

function TodoListComponent({ currentTodo, todos, setTodos }) {
  const [todoName, setTodoName] = useState(currentTodo.todoName);
  const [edit, setEdit] = useState(false); // initially edit functionality is off

  const handleSaveTodo = () => {
    const updatedTodoArray = todos.map((todo) => {
      if (todo.id === currentTodo.id) {
        return {
          todoName: todoName,
          id: currentTodo.id,
          isChecked: currentTodo.isChecked,
        };
      } else {
        return todo;
      }
    });

    setTodos(updatedTodoArray);
    localStorage.setItem('Todos', JSON.stringify(updatedTodoArray));

    setEdit(false);
  };

  const handleCheckboxChange = () => {
    const updatedTodoArray = todos.map((todo) => {
      if (todo.id === currentTodo.id) {
        return {
          todoName: currentTodo.todoName,
          id: currentTodo.id,
          isChecked: !currentTodo.isChecked,
        };
      } else {
        return todo;
      }
    });

    setTodos(updatedTodoArray);
    localStorage.setItem('Todos', JSON.stringify(updatedTodoArray));
  };

  const handleDeleteTodo = () => {
    const updatedTodoArray = todos.filter((todo) => todo.id !== currentTodo.id);
    setTodos(updatedTodoArray);
    localStorage.setItem('Todos', JSON.stringify(updatedTodoArray));
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
      <input
        type="checkbox"
        checked={currentTodo.isChecked}
        onChange={() => handleCheckboxChange()}
        className="w-5 h-5"
      />

      {edit ? (
        <input
          type="text"
          id={currentTodo.id}
          onChange={(e) => setTodoName(e.target.value)}
          value={todoName}
          className="flex-1 mx-2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <p className={`flex-1 mx-2 ${currentTodo.isChecked ? 'line-through text-gray-500' : ''}`}>
          {todoName}
        </p>
      )}

      {edit ? (
        <>
          <button
            type="button"
            onClick={() => {
              setEdit(false);
              setTodoName(currentTodo.todoName);
            }}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              handleSaveTodo();
            }}
            className="ml-2 px-2 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={() => {
              setEdit(true);
            }}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mr-1"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => {
              handleDeleteTodo();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 ml-1"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default TodoListComponent;
