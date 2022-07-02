import {StackScreenProps} from '@react-navigation/stack';

export type RootStackParams = {
  ImageFull: {
    uri: string;
    todoId: number;
  };
  TodoList: undefined;
  TodoDetails: {
    todoId: number;
  };
};

export type StackNavigationProps<T extends keyof RootStackParams> =
  StackScreenProps<RootStackParams, T>;
