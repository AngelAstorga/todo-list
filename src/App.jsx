import './App.css';
import style from './App.module.css';
import { useEffect, useState, useCallback, useReducer } from 'react';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';
import TodosViewForm from './features/TodosViewForm/TodoViewForm';
import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodoState,
} from './reducers/todos.reducer';

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

const encodeUrl = ({ sortField, sortDirection, queryString }) => {
  let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
  let searchQuery = ' ';
  if (!!searchQuery) {
    searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
  }
  return encodeURI(`${url}?${sortQuery}${searchQuery}`);
};

function App() {
  const [todoState, dispatch] = useReducer(todosReducer, initialTodoState);
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [queryString, setQueryString] = useState('');
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  async function handleAddTodo(title) {
    const newTodo = { title: title, isCompleted: false };
    const payLoad = JSON.stringify({
      records: [{ fields: newTodo }],
    });
    const options = {
      method: 'POST',
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: payLoad,
    };
    try {
      dispatch({ type: todoActions.startRequest });
      const resp = await fetch(
        encodeUrl({ sortDirection, sortField, queryString }),
        options
      );
      if (!resp.ok) {
        throw new Error(resp.message);
      }

      const { records } = await resp.json();
      console.log('####');
      console.log(records);
      dispatch({ type: todoActions.addTodo, records: records });
    } catch (e) {
      dispatch({
        type: todoActions.errorMessage,
        errorMessage: (e.message = 'Undefined'),
      });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  }

  async function completeTodo(id) {
    const originalTodo = todoState.todoList.find((todo) => todo.id == id);

    const payLoad = {
      records: [
        {
          id: originalTodo.id,
          fields: {
            isCompleted: !originalTodo.isCompleted,
          },
        },
      ],
    };
    const options = {
      method: 'PATCH',
      body: JSON.stringify(payLoad),
      headers: { Authorization: token, 'Content-Type': 'application/json' },
    };
    try {
      const resp = await fetch(
        encodeUrl({ sortDirection, sortField, queryString }),
        options
      );
      if (!resp.ok) {
        throw new Error(resp.message);
      }

      dispatch({ type: todoActions.completeTodo, id: id });
    } catch (e) {
      console.log(e.message);

      dispatch({
        type: todoActions.errorMessage,
        errorMessage: `${e.message}. Reverting todo...`,
      });
      dispatch({ type: todoActions.completeTodo, id: id });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  }

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: todoActions.fetchTodos });
      const options = { method: 'GET', headers: { Authorization: token } };

      try {
        const resp = await fetch(
          encodeUrl({ sortDirection, sortField, queryString }),
          options
        );
        if (!resp.ok) {
          throw new Error(resp.message);
        }
        const response = await resp.json();
        dispatch({ type: todoActions.loadTodos, records: response.records });
        console.log(todoState);
      } catch (e) {
        dispatch({
          type: todoActions.errorMessage,
          errorMessage: (e.message = 'Undefined'),
        });
      } finally {
        dispatch({ type: todoActions.endRequest });
      }
    };
    fetchTodos();
  }, [sortDirection, sortField, queryString]);

  async function updateTodo(editedTodo) {
    const payLoad = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
          },
        },
      ],
    };
    const options = {
      method: 'PATCH',
      body: JSON.stringify(payLoad),
      headers: { Authorization: token, 'Content-Type': 'application/json' },
    };
    try {
      const resp = await fetch(
        encodeUrl({ sortDirection, sortField, queryString }),
        options
      );
      if (!resp.ok) {
        throw new Error(resp.message);
      }
      const editedTodos = todoState.todoList.map((todo) => {
        if (todo.id == editedTodo.id) {
          return {
            ...todo,
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          };
        } else {
          return todo;
        }
      });
      console.log(editedTodos);
      dispatch({ type: todoActions.updateTodo, updatedTodos: editedTodos });
    } catch (e) {
      console.log(e.message);
      dispatch({
        type: todoActions.errorMessage,
        errorMessage: `${e.message}. Reverting todo...`,
      });
      dispatch({ type: todoActions.revertTodo });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  }
  return (
    <div className={style.AppWrapper}>
      <h1>My Todos</h1>
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
    </div>
  );
}

export default App;
