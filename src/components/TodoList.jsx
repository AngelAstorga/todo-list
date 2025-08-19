import TodoListItem from './TodoListItem';
function TodoList({ todoList, onCompleteTodo }) {
  const filteredTodoList = todoList.filter((item) => !item.isCompleted);
  return (
    <>
      {todoList.length === 0 && <p>Add a todo above to get started</p>}
      <ul>
        {filteredTodoList.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            onCompleteTodo={onCompleteTodo}
          />
        ))}
      </ul>
    </>
  );
}

export default TodoList;
