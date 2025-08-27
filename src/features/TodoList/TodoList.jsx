import TodoListItem from './TodoListItem';
function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }) {
  const filteredTodoList = todoList.filter((item) => !item.isCompleted);
  return (
    <>
      {todoList.length === 0 && <p>Add a todo above to get started</p>}
      {isLoading ? (
        <p>Todo list loading...</p>
      ) : (
        <ul>
          {filteredTodoList.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
              onUpdateTodo={onUpdateTodo}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default TodoList;
