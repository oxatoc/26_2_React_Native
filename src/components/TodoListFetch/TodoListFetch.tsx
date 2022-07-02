import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {BaseButton} from '../Base/Button/BaseButton';
import {styles} from './TodoListFetch.styles';
import {TodoListFetchProps} from './TodoListFetch.types';

export const TodoListFetch = ({
  isFetching,
  isFailure,
  onRetry,
}: TodoListFetchProps) => (
  <View style={styles.root}>
    {isFetching && <ActivityIndicator size="large" color="#4318FF" />}
    {isFailure && (
      <>
        <Text>Ошибка чтения данных</Text>
        <View style={styles.reloadWrapper}>
          <BaseButton onPress={onRetry}>Повторить</BaseButton>
        </View>
      </>
    )}
  </View>
);
