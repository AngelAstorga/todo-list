import { useRef, useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';

function TodoForm({ onAddTodo }) {
  const todoTitleInput = useRef(null);
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle('');
    todoTitleInput.current.focus();
  }

  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId="todoTitle"
        ref={todoTitleInput}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
        labelText="Todo"
        value={workingTodoTitle}
      />
      <button disabled={workingTodoTitle.trim() === ''}> Add Todo</button>
    </form>
  );
}
export default TodoForm;
