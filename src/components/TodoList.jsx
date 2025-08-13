import TodoListItem from './TodoListItem';
function TodoList({ todoList, onCompleteTodo }) {
  const filteredTodoList = todoList.filter((item) => !item.isCompleted);
  return (
    <ul>
      {filteredTodoList.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onCompleteTodo={onCompleteTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
