import {StackNavigationProps} from '@/navigation/StackNavigator/StackNavigation.types';
import {Asset} from 'react-native-image-picker';

export type Todo = {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
  assets: Asset[];
};

export type TodoListProps = StackNavigationProps<'TodoList'>;

export type Section = {
  section: {
    data: Todo[];
    title: string;
  };
};
