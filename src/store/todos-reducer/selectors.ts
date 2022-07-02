import {FETCH_STATUSES} from '../../utils/constants';
import {TodosState} from './types';

export const selectStatus = (state: TodosState) => state.status;

export const selectFailure = (state: TodosState) =>
  state.status === FETCH_STATUSES.failure;

export const selectFetching = (state: TodosState) =>
  state.status === FETCH_STATUSES.request;

export const selectCompleted = (state: TodosState) =>
  Object.values(state.completed);

export const selectUncompleted = (state: TodosState) =>
  Object.values(state.uncompleted);

export const selectTodoById = (todoId: number) => (state: TodosState) => {
  return state.completed[todoId] || state.uncompleted[todoId];
};
