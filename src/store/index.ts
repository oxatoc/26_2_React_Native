import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyMiddleware, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import todosReducer from './todos-reducer/reducer';
import {Action, TodosState} from './todos-reducer/types';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer<TodosState, Action>(
  persistConfig,
  todosReducer,
);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
