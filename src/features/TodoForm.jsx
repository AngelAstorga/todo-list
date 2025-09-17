import { useRef, useState } from 'react';
import StyledTodoForm from './TodoForm.styled';
import TextInputWithLabel from '../shared/TextInputWithLabel';

function TodoForm({ onAddTodo, isSaving }) {
  const todoTitleInput = useRef(null);
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle('');
    todoTitleInput.current.focus();
  }

  return (
    <StyledTodoForm onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId="todoTitle"
        ref={todoTitleInput}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
        labelText="Todo"
        value={workingTodoTitle}
      />
      <button disabled={workingTodoTitle.trim() === ''}>
        {' '}
        {isSaving ? 'Saving...' : ' Add Todo'}
      </button>
    </StyledTodoForm>
  );
}
export default TodoForm;
