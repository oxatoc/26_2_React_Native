import {BaseTextInput} from '@/components/Base/TextInput/BaseTextInput';
import {CommonText} from '@/components/Common/CommonText/CommonText';
import notificationService from '@/services/todoNotificationService';
import notifee from '@notifee/react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  SectionList,
  SectionListData,
  SectionListRenderItemInfo,
  View,
} from 'react-native';
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
  const [showDemo, setShowDemo] = useState(true);

  useEffect(() => {
    // @ts-ignore
    dispatch(getTodos());
  }, [dispatch]);

  const handleComplete = useCallback(
    (id: number) => {
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

  useEffect(() => {
    setShowDemo(false);
  }, []);

  const renderTodo = (info: SectionListRenderItemInfo<Todo>) => {
    const {item, index, section} = info;

    return (
      <TodoItem
        key={`${item?.id}-${item?.title}`}
        todo={item}
        onComplete={handleComplete}
        onDelete={handleDelete}
        onPress={handlePressThumbnail}
        doDemoSwipe={index === 0 && section.key === 'first' && showDemo}
      />
    );
  };

  const renderSectionHeader = ({section}: Section) => (
    <CommonText style={styles.sectionHeader}>{section.title}</CommonText>
  );

  const sectionSeparator = () => <View style={styles.sectionSeparator} />;

  const itemSeparator = () => <View style={styles.itemSeparator} />;

  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      notificationService.handleEvent(type, detail);
    });
  }, []);

  const isAppOpenedByNotif = useCallback(async () => {
    const initialNotification = await notifee.getInitialNotification();
    if (initialNotification) {
      const todoId = initialNotification.notification?.data?.id;
      if (todoId) {
        navigation.navigate('TodoDetails', {todoId: parseInt(todoId, 10)});
      }
    }
  }, [navigation]);

  useEffect(() => {
    isAppOpenedByNotif();
  }, [isAppOpenedByNotif]);

  const sections = useMemo<ReadonlyArray<SectionListData<Todo>>>(() => {
    return [
      {data: uncompletedTodos, title: 'Незавершенные', key: 'first'},
      {data: completedTodos, title: 'Завершенные', key: 'second'},
    ];
  }, [completedTodos, uncompletedTodos]);

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
      <SectionList
        sections={sections}
        renderItem={renderTodo}
        renderSectionHeader={renderSectionHeader}
        SectionSeparatorComponent={sectionSeparator}
        ItemSeparatorComponent={itemSeparator}
      />
    </>
  );
};
