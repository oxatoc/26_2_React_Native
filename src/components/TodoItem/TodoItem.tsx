import React, {useCallback, useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Reanimated, {
  Easing,
  LightSpeedInLeft,
  LightSpeedOutRight,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
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
  doDemoSwipe = false,
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
    .onUpdate(({translationX}) => {
      if (translationX === 0) {
        return;
      }

      if (translationX > 0) {
        leverWidth.value = Math.max(startWidth.value - translationX, 0);
        return;
      }

      if (leverWidth.value === MAX_WIDTH) {
        return;
      }
      if (translationX > -MAX_WIDTH) {
        leverWidth.value = -translationX;
      }
    })
    .onEnd(({translationX}) => {
      let threshold = Math.abs(translationX) / MAX_WIDTH;

      let endValue;

      if (translationX > 0) {
        endValue = threshold > GESTURE_THRESHOLD ? 0 : MAX_WIDTH;
      } else {
        endValue = threshold < GESTURE_THRESHOLD ? 0 : MAX_WIDTH;
      }

      leverWidth.value = withTiming(endValue, {
        duration: 300,
        easing:
          endValue === 0 ? Easing.in(Easing.ease) : Easing.out(Easing.ease),
      });
      startWidth.value = endValue;
    })
    .activeOffsetX([-10, 10]);

  // Демо свайпа при первом открытии
  const demoDuration = 800;

  useEffect(() => {
    if (doDemoSwipe) {
      leverWidth.value = withSequence(
        withTiming(MAX_WIDTH, {
          duration: demoDuration,
          easing: Easing.in(Easing.ease),
        }),
        withTiming(0, {
          duration: demoDuration,
          easing: Easing.out(Easing.ease),
        }),
      );
    }
  }, [leverWidth, MAX_WIDTH, doDemoSwipe]);

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
