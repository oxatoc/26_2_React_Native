import React, {useCallback} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Reanimated, {
  LightSpeedInLeft,
  LightSpeedOutRight,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {BaseCheckbox} from '../Base/Checkbox/BaseCheckbox';
import {BaseThumbnail} from '../Base/Thumbnail/BaseThumbnail';
import {CommonText} from '../Common/CommonText/CommonText';
import {CommonDeleteButton} from '../Common/DeleteButton/СommonDeleteButton';
import {styles} from './TodoItem.styles';
import {TodoItemProps} from './TodoItem.types';

export const TodoItem = ({
  todo,
  onComplete,
  onDelete,
  onPress,
}: TodoItemProps) => {
  const handleComplete = useCallback(() => {
    onComplete(todo.id);
  }, [onComplete]);

  const handlePressImage = useCallback(() => {
    onPress(todo.id);
  }, [onPress]);

  const offset = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offset.value}],
    };
  });

  const start = useSharedValue(0);
  const MAX_OFFSET = -50;
  const gesture = Gesture.Pan()
    .onUpdate(e => {
      if (e.translationX < -start.value && e.translationX > MAX_OFFSET) {
        offset.value = e.translationX + start.value;
      }
    })
    .onEnd(() => {
      start.value = offset.value;
    });

  return (
    <Reanimated.View
      style={styles.root}
      entering={LightSpeedInLeft}
      exiting={LightSpeedOutRight}>
      <BaseCheckbox checked={todo.completed} onPress={handleComplete} />
      <TouchableOpacity
        onPress={handlePressImage}
        style={styles.todoTextWrapper}>
        <CommonText kind="kind_value" style={styles.todoText}>
          {todo.id}: {todo.title}
        </CommonText>
      </TouchableOpacity>
      {todo.assets.length > 0 && (
        <BaseThumbnail style={styles.thumbnail} uri={todo.assets[0].uri} />
      )}
      <CommonDeleteButton onPress={() => onDelete(todo.id)} />
      <GestureDetector gesture={gesture}>
        <View style={[animatedStyle, styles.gestureLever]}>
          {/* Рычаг для жеста анимации */}
          <Text>lever</Text>
        </View>
      </GestureDetector>
    </Reanimated.View>
  );
};
