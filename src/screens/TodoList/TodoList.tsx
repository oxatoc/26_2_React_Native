import {BaseTextInput} from '@/components/Base/TextInput/BaseTextInput';
import {CommonText} from '@/components/Common/CommonText/CommonText';
import Example from '@/components/Example';
import notificationService from '@/services/todoNotificationService';
import notifee from '@notifee/react-native';
import React, {useCallback, useEffect} from 'react';
import {ListRenderItemInfo, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {TodoItem} from '../../components/TodoItem/TodoItem';
import {TodoListFetch} from '../../components/TodoListFetch/TodoListFetch';
import {
  addTodo,
  completeTodo,
  getTodos,
  removeTodo,
} from '../../store/todos-reducer/actions';
import {
  selectCompleted,
  selectFailure,
  selectFetching,
  selectUncompleted,
} from '../../store/todos-reducer/selectors';
import {styles} from './TodoList.styles';
import {Section, Todo, TodoListProps} from './TodoList.types';

export const TodoList = ({navigation}: TodoListProps) => {
  const completedTodos = useSelector(selectCompleted);
  const uncompletedTodos = useSelector(selectUncompleted);
  const isFailure = useSelector(selectFailure);
  const isFetching = useSelector(selectFetching);
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(getTodos());
  }, [dispatch]);

  const handleComplete = useCallback(
    id => {
      dispatch(completeTodo(id));
    },
    [dispatch],
  );

  const handleLoad = useCallback(() => {
    // @ts-ignore
    dispatch(getTodos());
  }, [dispatch]);

  const createTodo = (text: string) => {
    dispatch(addTodo(text));
  };

  const handleDelete = useCallback(
    (id: number | string) => {
      dispatch(removeTodo(id));
    },
    [dispatch],
  );

  const handlePressThumbnail = useCallback(
    (id: number) => {
      navigation.push('TodoDetails', {todoId: id});
    },
    [navigation],
  );

  const renderTodo = ({item}: ListRenderItemInfo<Todo>) => (
    <TodoItem
      key={`${item.id}-${item.title}`}
      todo={item}
      onComplete={handleComplete}
      onDelete={handleDelete}
      onPress={handlePressThumbnail}
    />
  );

  const renderSectionHeader = ({section}: Section) => (
    <CommonText style={styles.sectionHeader}>{section.title}</CommonText>
  );

  const sectionSeparator = () => <View style={styles.separator} />;

  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      notificationService.handleEvent(type, detail);
    });
  }, []);

  const isAppOpenedByNotif = async () => {
    const initialNotification = await notifee.getInitialNotification();
    if (initialNotification) {
      const todoId = initialNotification.notification?.data?.id;
      if (todoId) {
        navigation.navigate('TodoDetails', {todoId: parseInt(todoId)});
      }
    }
  };

  useEffect(() => {
    isAppOpenedByNotif();
  }, []);

  return (
    <>
      <BaseTextInput
        value={''}
        placeholder="Новая задача"
        onSubmit={createTodo}
        style={styles.newTaskinput}
      />
      {(isFetching || isFailure) && (
        <TodoListFetch
          isFetching={isFetching}
          isFailure={isFailure}
          onRetry={handleLoad}
        />
      )}
      {/* <SectionList
        sections={[
          {data: uncompletedTodos, title: 'Незавершенные'},
          {data: completedTodos, title: 'Завершенные'},
        ]}
        renderItem={renderTodo}
        renderSectionHeader={renderSectionHeader}
        SectionSeparatorComponent={sectionSeparator}
      /> */}
      <Animated.ScrollView>
        {uncompletedTodos.map(item => (
          <TodoItem
            key={`${item.id}-${item.title}`}
            todo={item}
            onComplete={handleComplete}
            onDelete={handleDelete}
            onPress={handlePressThumbnail}
          />
        ))}
      </Animated.ScrollView>
      <Example />
    </>
  );
};
