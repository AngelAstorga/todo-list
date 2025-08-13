import './App.css';
import { useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
  const [todoList, setTodoList] = useState([]);

  function handleAddTodo(title) {
    const newTodo = { title: title, id: Date.now(), isCompleted: false };
    setTodoList([...todoList, newTodo]);
  }

  function completeTodo(id) {
    const updatedTodos = [...todoList];
    todoList.map((todo, index) => {
      if (todo.id === id) {
        updatedTodos.splice(index, 1, { ...todo, isCompleted: true });
        setTodoList([...updatedTodos]);
      }
    });
  }

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      {!todoList.length > 0 && <p>Add a todo above to get started</p>}
      <TodoList
        todoList={todoList}
        setTodoList={setTodoList}
        onCompleteTodo={completeTodo}
      />
    </div>
  );
}

export default App;
