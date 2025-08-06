import './App.css';
import { useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
function App() {
  const [newTodo, setNewTodo] = useState('Example of new Todo');
  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm />
      <p>{newTodo}</p>
      <TodoList />
    </div>
  );
}

export default App;
