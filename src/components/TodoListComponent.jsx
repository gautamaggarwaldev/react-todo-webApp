/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

function TodoListComponent({ currentTodo, todos, setTodos }) {
  const [todoName, setTodoName] = useState(currentTodo.todoName);
  const [edit, setEdit] = useState(false); // initially edit functionality is off

    // handle the save todo functionality
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
    localStorage.setItem('Todos', JSON.stringify(updatedTodoArray)); //set updated todo in local storage

    setEdit(false);
  };

  const handleCheckboxChange = () => {
    const updatedTodoArray = todos.map((todo) => {
      if (todo.id === currentTodo.id) {
        return {
          todoName: currentTodo.todoName,
          id: currentTodo.id,
          isChecked: !currentTodo.isChecked, // toggle the isChecked value
        };
      } else {
        return todo;
      }
    });

    setTodos(updatedTodoArray);
    localStorage.setItem('Todos', JSON.stringify(updatedTodoArray));
  };

//   delete todo functionality
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

      {/* if edit(true) then show input and change todo else show todoname */}

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

      {/* if edit(true) show cancel and save button else show edit and delete button */}

      {edit ? (
        <>
          <button
            type="button"
            onClick={() => {
              setEdit(false);
              setTodoName(currentTodo.todoName);
            }}
            className="ml-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              handleSaveTodo();
            }}
            className="ml-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
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
