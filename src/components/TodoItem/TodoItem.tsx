import React, {useCallback} from 'react';
import {TouchableOpacity, View} from 'react-native';
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
  }, [onComplete, todo.id]);

  const handlePressImage = useCallback(() => {
    onPress(todo.id);
  }, [onPress, todo.id]);

  const MAX_WIDTH = 38 + 38;
  const leverWidth = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: leverWidth.value,
    };
  });

  const startWidth = useSharedValue(0);

  const GESTURE_THRESHOLD = 0.5;

  const gesture = Gesture.Pan()
    .onUpdate(e => {
      if (e.translationX === 0) {
        return;
      }

      if (e.translationX > 0) {
        leverWidth.value = Math.max(startWidth.value - e.translationX, 0);
        return;
      }

      if (e.translationX > -MAX_WIDTH) {
        leverWidth.value = -e.translationX;
      }
    })
    .onEnd(e => {
      const threshold = Math.abs(e.translationX) / MAX_WIDTH;

      let endValue;

      if (e.translationX > 0) {
        endValue = threshold > GESTURE_THRESHOLD ? 0 : MAX_WIDTH;
      } else {
        endValue = threshold < GESTURE_THRESHOLD ? 0 : MAX_WIDTH;
      }

      leverWidth.value = endValue;
      startWidth.value = endValue;
    })
    .activeOffsetX([-10, 10]);

  return (
    <Reanimated.View
      style={styles.root}
      entering={LightSpeedInLeft}
      exiting={LightSpeedOutRight}>
      <GestureDetector gesture={gesture}>
        <View style={styles.shrinkableWrapper}>
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
        </View>
      </GestureDetector>
      <Reanimated.View style={[styles.gestureLever, animatedStyle]}>
        <CommonDeleteButton
          onPress={() => onDelete(todo.id)}
          style={styles.deleteButton}
        />
      </Reanimated.View>
    </Reanimated.View>
  );
};
