import './App.css';
import style from './App.module.css';
import { useEffect, useState, useCallback } from 'react';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';
import TodosViewForm from './features/TodosViewForm/TodoViewForm';

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
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
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
      setIsSaving(true);
      const resp = await fetch(
        encodeUrl({ sortDirection, sortField, queryString }),
        options
      );
      if (!resp.ok) {
        throw new Error(resp.message);
      }

      const { records } = await resp.json();
      const savedTodo = {
        id: records[0],
        title: records[0].fields.title,
      };
      if (!records[0].fields.isCompleted) {
        savedTodo.isCompleted = false;
      }
      setTodoList([...todoList, savedTodo]);
    } catch (e) {
      console.log('erro');
      setErrorMessage((e.message = 'Undefined'));
    } finally {
      setIsSaving(false);
    }
  }

  async function completeTodo(id) {
    const originalTodo = todoList.find((todo) => todo.id == id);

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
      const updatedTodos = todoList.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: !originalTodo.isCompleted };
        } else {
          return todo;
        }
      });
      setTodoList(updatedTodos);
    } catch (e) {
      console.log(e.message);
      setErrorMessage(`${e.message}. Reverting todo...`);
      const updatedTodos = todoList.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: originalTodo.isCompleted };
        } else {
          return todo;
        }
      });
      setTodoList(updatedTodos);
    } finally {
      setIsSaving(false);
    }
  }

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
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
        const fetchedExamples = response.records.map((record) => {
          const todo = {
            id: record.id,
            ...record.fields,
          };
          if (!todo.isCompleted) {
            todo.isCompleted = false;
          }
          return todo;
        });
        setTodoList(fetchedExamples);
      } catch (e) {
        setErrorMessage((e.message = 'Undefined'));
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, [sortDirection, sortField, queryString]);

  async function updateTodo(editedTodo) {
    const originalTodo = todoList.find((todo) => todo.id == editedTodo.id);
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
      const editedTodos = todoList.map((todo) => {
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
      setTodoList(editedTodos);
    } catch (e) {
      console.log(e.message);
      setErrorMessage(`${e.message}. Reverting todo...`);
      const revertedTodos = todoList.map((todo) => {
        if (todo.id == originalTodo.id) {
          return { ...todo, title: editedTodo.title, isCompleted: editedTodo };
        } else {
          return todo;
        }
      });
      setTodoList(revertedTodos);
    } finally {
      setIsSaving(false);
    }
  }
  return (
    <div className={style.AppWrapper}>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={handleAddTodo} isSaving={isSaving} />
      <TodoList
        todoList={todoList}
        setTodoList={setTodoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isLoading={isLoading}
      />
      {errorMessage != '' && (
        <>
          <hr />
          <p className={style.ErrorMessage}>{errorMessage}</p>
          <button
            onClick={() => {
              setErrorMessage('');
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
