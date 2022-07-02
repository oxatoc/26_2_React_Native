import {FETCH_STATUSES} from '../../utils/constants';
import {
  ADD_TODO,
  CHANGE_COMPLETE_TODO,
  CHANGE_TODO,
  GET_TODOS_FAILURE,
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
  REMOVE_TODO,
} from './actions';
import {
  Action,
  AddTodoAction,
  ChangeTodoAction,
  ChangeTodoCompleteAction,
  GetTodosSuccessAction,
  RemoveTodoAction,
  TodosState,
} from './types';

const initialState: TodosState = {
  completed: {},
  uncompleted: {},
  status: FETCH_STATUSES.idle,
};

const todosReducer = (state = initialState, action: Action) => {
  const getStoreName = (isCompleted: boolean) =>
    isCompleted ? 'completed' : 'uncompleted';

  switch (action.type) {
    case GET_TODOS_REQUEST: {
      return {
        ...state,
        status: FETCH_STATUSES.request,
      };
    }
    case GET_TODOS_SUCCESS: {
      const typedAction = action as GetTodosSuccessAction;
      return {
        ...state,
        status: FETCH_STATUSES.success,
        completed: typedAction.payload.completed,
        uncompleted: typedAction.payload.uncompleted,
      };
    }
    case GET_TODOS_FAILURE: {
      return {
        ...state,
        status: FETCH_STATUSES.failure,
      };
    }
    case ADD_TODO: {
      const typedAction = action as AddTodoAction;
      const todo = typedAction.payload;
      const storeName = getStoreName(!!todo.completed);
      const store = {...state[storeName], [todo.id]: todo};

      return {
        ...state,
        [storeName]: store,
      };
    }
    case CHANGE_COMPLETE_TODO: {
      const typedAction = action as ChangeTodoCompleteAction;
      const todoId = typedAction.payload;
      const storeName = getStoreName(!!state.completed[todoId]);

      const todo = state[storeName][todoId];

      const completed = {...state.completed};
      const uncompleted = {...state.uncompleted};
      delete completed[todo.id];
      delete uncompleted[todo.id];

      todo.completed = !todo.completed;

      if (todo.completed) {
        completed[todo.id] = todo;
      } else {
        uncompleted[todo.id] = todo;
      }

      return {
        ...state,
        completed,
        uncompleted,
      };
    }
    case CHANGE_TODO: {
      const typedAction = action as ChangeTodoAction;
      const todo = typedAction.payload;
      const storeName = getStoreName(todo.completed);
      const todos = {...state[storeName], [todo.id]: todo};
      return {...state, [storeName]: todos};
    }
    case REMOVE_TODO: {
      const typedAction = action as RemoveTodoAction;
      const todoId = typedAction.payload;

      const storeName = getStoreName(!!state.completed[todoId]);

      const todos = {...state[storeName]};
      delete todos[todoId];
      return {...state, [storeName]: todos};
    }
    default:
      return state;
  }
};

export default todosReducer;
