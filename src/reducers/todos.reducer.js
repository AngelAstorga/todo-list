const actions = {
  fetchTodos: 'fetchTodos',
  loadTodos: 'loadTodos',
  errorMessage: 'errorMessage',
  startRequest: 'startRequest',
  addTodo: 'addTodo',
  endRequest: 'endRequest',
  updateTodo: 'updateTodo',
  completeTodo: 'completeTodo',
  revertTodo: 'revertTodo',
  clearError: 'clearError',
};
const initialState = {
  isLoading: false,
  isSaving: false,
  todoList: [],
  errorMessage: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.fetchTodos:
      return {
        ...state,
        isLoading: true,
      };
    case actions.loadTodos: {
      const fetchedExamples = action.records.map((record) => {
        const todo = {
          id: record.id,
          ...record.fields,
        };

        if (!todo.isCompleted) {
          todo.isCompleted = false;
        }

        return todo;
      });
      return {
        ...state,
        todoList: [...fetchedExamples],
      };
    }
    case actions.errorMessage:
      return {
        ...state,
        errorMessage: action.errorMessage,
        isLoading: false,
      };
    case actions.startRequest:
      return {
        ...state,
        isSaving: true,
      };
    case actions.addTodo: {
      const savedTodo = {
        id: action.records[0].id,
        title: action.records[0].fields.title,
      };
      console.log(savedTodo);
      if (!action.records[0].fields.isCompleted) {
        savedTodo.isCompleted = false;
      }
      return {
        ...state,
        todoList: [...state.todoList, savedTodo],
        isSaving: false,
      };
    }
    case actions.endRequest:
      return {
        ...state,
        isLoading: false,
        isSaving: false,
      };
    case actions.updateTodo: {
      return {
        ...state,
        todoList: [...action.updatedTodos],
      };
    }

    case actions.completeTodo: {
      const originalTodo = state.todoList.find((todo) => todo.id == action.id);
      const updatedTodos = state.todoList.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, isCompleted: !originalTodo.isCompleted };
        } else {
          return todo;
        }
      });
      return {
        ...state,
        todoList: updatedTodos,
      };
    }
    case actions.revertTodo: {
      const originalTodo = action.todoList.find((todo) => todo.id == action.id);
      const updatedTodos = action.todoList.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, isCompleted: originalTodo.isCompleted };
        } else {
          return todo;
        }
      });
      return {
        ...state,
        todoList: [...updatedTodos],
      };
    }
    case actions.clearError:
      return {
        ...state,
        errorMessage: '',
      };
    default:
      return {
        ...state,
      };
  }
}

export { initialState, actions, reducer };
