import {Todo} from '../../screens/TodoList/TodoList.types';

export type TodoItemProps = {
  todo: Todo;
  onComplete: (id: number) => void;
  onDelete: (id: number | string) => void;
  onPress: (id: number) => void;
  doDemoSwipe: boolean; // показывать демонстрацию свайпа
};
