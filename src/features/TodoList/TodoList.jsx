import TodoListItem from './TodoListItem';
import style from './TodoList.module.css';
import { useNavigate, useSearchParams } from 'react-router';
import { useEffect } from 'react';
function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }) {
  const filteredTodoList = todoList.filter((item) => !item.isCompleted);
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = 15;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const indexOfFirstTodo = (currentPage - 1) * 15;
  const totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);
  const navigate = useNavigate();
  useEffect(() => {
    if (totalPages > 0) {
      if (
        typeof currentPage !== 'number' ||
        currentPage < 1 ||
        currentPage > totalPages
      ) {
        navigate('/');
      }
    }
  }, [currentPage, totalPages, navigate]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setSearchParams(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setSearchParams(currentPage - 1);
    }
  };

  return (
    <>
      {todoList.length === 0 && <p>Add a todo above to get started</p>}
      {isLoading ? (
        <p>Todo list loading...</p>
      ) : (
        <div>
          <ul className={style.List}>
            {filteredTodoList.map((todo) => (
              <TodoListItem
                key={todo.id}
                todo={todo}
                onCompleteTodo={onCompleteTodo}
                onUpdateTodo={onUpdateTodo}
              />
            ))}
          </ul>
          <div className="paginationControls">
            <ul className={style.paginationUList}>
              <li>
                <button
                  onClick={() => {
                    handlePreviousPage;
                  }}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              <span>
                {currentPage} of {totalPages}
              </span>
              <li>
                <button
                  onClick={() => {
                    handleNextPage;
                  }}
                  disabled={currentPage == totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default TodoList;
