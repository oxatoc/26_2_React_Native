import {CommonText} from '@/components/Common/CommonText/CommonText';
import {CommonDeleteButton} from '@/components/Common/DeleteButton/СommonDeleteButton';
import {CommonLabel} from '@/components/Common/Label/CommonLabel';
import {changeTodo} from '@/store/todos-reducer/actions';
import {selectTodoById} from '@/store/todos-reducer/selectors';
import React, {useEffect} from 'react';
import {Alert, Image, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Todo} from '../TodoList/TodoList.types';
import {styles} from './ImageFull.styles';
import {ImageFullProps} from './ImageFull.types';

export const ImageFull = ({navigation, route}: ImageFullProps) => {
  const todo: Todo = useSelector(selectTodoById(route.params.todoId));
  const dispatch = useDispatch();

  const handleConfirm = () => {
    const newTodo = {
      ...todo,
      assets: todo.assets.filter(asset => asset.uri !== route.params.uri),
    };
    dispatch(changeTodo(newTodo));
    navigation.goBack();
  };

  const handlePress = () => {
    Alert.alert('Удалить изображение?', undefined, [
      {text: 'Удалить', onPress: handleConfirm},
      {text: 'Отмена'},
    ]);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <CommonDeleteButton onPress={handlePress} />,
    });
  }, []);

  return (
    <ScrollView style={styles.root}>
      <CommonLabel style={styles.label}>Задача:</CommonLabel>
      <CommonText style={styles.text}>
        {todo.id}. {todo.title}
      </CommonText>
      <CommonLabel style={styles.label}>Файл:</CommonLabel>
      <CommonText kind="kind_value" style={styles.text}>
        {route.params.uri}
      </CommonText>
      <Image source={{uri: route.params.uri}} style={styles.image} />
    </ScrollView>
  );
};
