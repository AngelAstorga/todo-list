import TodoForm from '../features/TodoForm';
import TodoList from '../features/TodoList/TodoList';
import TodosViewForm from '../features/TodosViewForm/TodoViewForm';
import style from '../App.module.css';

function TodoPage({
  handleAddTodo,
  todoState,
  completeTodo,
  updateTodo,
  todoActions,
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
  dispatch,
}) {
  return (
    <>
      <TodoForm onAddTodo={handleAddTodo} isSaving={todoState.isSaving} />
      <TodoList
        todoList={todoState.todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isLoading={todoState.isLoading}
      />

      {todoState.errorMessage != '' && (
        <>
          <hr />
          <p className={style.ErrorMessage}>{todoState.errorMessage}</p>
          <button
            onClick={() => {
              dispatch({ type: todoActions.errorMessage, errorMessage: '' });
            }}
          >
            dismiss
          </button>
        </>
      )}
      <hr />
      <TodosViewForm
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortField={sortField}
        setSortField={setSortField}
        queryString={queryString}
        setQueryString={setQueryString}
      />
    </>
  );
}

export default TodoPage;
