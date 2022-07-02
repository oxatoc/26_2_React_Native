import {Asset} from 'react-native-image-picker';
import {Dispatch} from 'redux';
import {Todo} from '../../screens/TodoList/TodoList.types';
import httpService from '../../services/httpService';
import {TODOS_URL} from '../../utils/constants';
import {TodosByCompleted} from './types';

export const GET_TODOS_REQUEST = 'TODOS::GET_TODOS_REQUEST';
export const GET_TODOS_SUCCESS = 'TODOS::GET_TODOS_SUCCESS';
export const GET_TODOS_FAILURE = 'TODOS::GET_TODOS_FAILURE';
export const ADD_TODO = 'TODOS::ADD_TODO';
export const CHANGE_COMPLETE_TODO = 'TODOS::CHANGE_COMPLETE_TODO';
export const CHANGE_TODO = 'TODOS::CHANGE_TODO';
export const REMOVE_TODO = 'TODOS::REMOVE_TODO';

export const getTodosRequest = () => ({
  type: GET_TODOS_REQUEST,
});

export const getTodosSuccess = (todos: TodosByCompleted) => ({
  type: GET_TODOS_SUCCESS,
  payload: todos,
});

export const getTodosFailure = (e: any) => ({
  type: GET_TODOS_FAILURE,
  payload: e,
});

export const getTodos = () => (dispatch: Dispatch<any>) => {
  dispatch(getTodosRequest());
  httpService
    .get(TODOS_URL)
    .then<Todo[]>(response => response.data)
    .then(result => {
      const todos = result.splice(0, 1).reduce<TodosByCompleted>(
        (acc: TodosByCompleted, el: Todo) => {
          const assets: Asset[] = [];

          const todo = {...el, assets};

          if (todo.completed) {
            acc.completed[todo.id] = todo;
          } else {
            acc.uncompleted[todo.id] = todo;
          }
          return acc;
        },
        {completed: {}, uncompleted: {}},
      );
      dispatch(getTodosSuccess(todos));
    })
    .catch(e => {
      dispatch(getTodosFailure(e));
    });
};

export const addTodo = (title: string) => {
  const newTodo: Todo = {
    title,
    id: Date.now(),
    completed: false,
    userId: -1,
    assets: [],
  };

  return {
    type: ADD_TODO,
    payload: newTodo,
  };
};

export const changeTodo = (todoItem: Todo) => ({
  type: CHANGE_TODO,
  payload: todoItem,
});

export const completeTodo = (id: number) => ({
  type: CHANGE_COMPLETE_TODO,
  payload: id,
});

export const removeTodo = (id: number | string) => ({
  type: REMOVE_TODO,
  payload: id,
});
