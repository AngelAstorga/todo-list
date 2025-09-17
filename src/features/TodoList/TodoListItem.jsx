import { useState, useEffect } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';
import style from './TodoListItem.module.css';

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  useEffect(() => {
    setWorkingTitle(todo.title);
  }, [todo]);

  function handleCancel() {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  }
  function handleUpdate(e) {
    if (!isEditing) {
      return;
    } else {
      e.preventDefault();
      onUpdateTodo({ ...todo, title: workingTitle });
      setIsEditing(false);
    }
  }
  function handleEdit(e) {
    setWorkingTitle(e.target.value);
  }
  return (
    <li className={style.ListItem}>
      {isEditing ? (
        <>
          <TextInputWithLabel
            value={workingTitle}
            onChange={(e) => handleEdit(e)}
          />
          <button type="button" onClick={() => handleCancel()}>
            Cancel
          </button>
          <button type="button" onClick={(e) => handleUpdate(e)}>
            Update
          </button>
        </>
      ) : (
        <form action="" onSubmit={handleUpdate}>
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => {
              onCompleteTodo(todo.id);
            }}
          />
          <span onClick={() => setIsEditing(true)}>{todo.title}</span>
        </form>
      )}
    </li>
  );
}
export default TodoListItem;
