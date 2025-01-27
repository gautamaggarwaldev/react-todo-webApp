/* eslint-disable no-unused-vars */
import { useState } from 'react';
import './App.css';
import CreateTodo from './components/CreateTodo';
import TodoListComponent from './components/TodoListComponent';

function App() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('Todos')) || []
  );

  const [todoName, setTodoName] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Efficio App</h1>
      <CreateTodo
        setTodoName={setTodoName}
        todos={todos}
        todoName={todoName}
        setTodos={setTodos}
      />
      <div className="mt-6 w-full max-w-md space-y-4">
        {todos.map((e) => (
          <TodoListComponent
            key={e.id}
            currentTodo={e}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
