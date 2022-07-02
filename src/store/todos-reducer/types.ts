import {Todo} from '../../screens/TodoList/TodoList.types';
import {FETCH_STATUSES} from '../../utils/constants';

export type TodosMap = {
  [id: number]: Todo;
};

export type TodosByCompleted = {
  completed: TodosMap;
  uncompleted: TodosMap;
};

export type TodosState = {
  status: FETCH_STATUSES;
  completed: TodosMap;
  uncompleted: TodosMap;
};

export type GetTodosRequestAction = {
  type: string;
};
export type GetTodosSuccessAction = {
  type: string;
  payload: TodosByCompleted;
};
export type GetTodosFailureAction = {
  type: string;
  payload: any;
};

export type AddTodoAction = {
  type: string;
  payload: Todo;
};

export type ChangeTodoCompleteAction = {
  type: string;
  payload: number;
};

export type ChangeTodoAction = {
  type: string;
  payload: Todo;
};

export type RemoveTodoAction = {
  type: string;
  payload: number;
};

export type Action =
  | GetTodosRequestAction
  | GetTodosSuccessAction
  | GetTodosFailureAction
  | AddTodoAction
  | ChangeTodoCompleteAction
  | ChangeTodoAction
  | RemoveTodoAction;
