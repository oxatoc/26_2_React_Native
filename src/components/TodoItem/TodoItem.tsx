import React, {useCallback, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
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

  const MAX_WIDTH = -(38 + 38);
  const offset = useSharedValue(0);
  const start = useSharedValue(0);

  const movableStyle = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value}],
  }));

  const GESTURE_THRESHOLD = 0.5;
  const gesture = Gesture.Pan()
    .onUpdate(({translationX}) => {
      offset.value = translationX + start.value;
      offset.value = Math.min(offset.value, 0);
      offset.value = Math.max(offset.value, MAX_WIDTH);
    })
    .onEnd(() => {
      let position = offset.value / MAX_WIDTH;

      let endPosition = position > GESTURE_THRESHOLD ? MAX_WIDTH : 0;
      offset.value = withTiming(endPosition, {
        duration: 300,
        easing:
          endPosition === 0 ? Easing.in(Easing.ease) : Easing.out(Easing.ease),
      });

      start.value = endPosition;
    })
    .activeOffsetX([-10, 10]);

  // Демо свайпа при первом открытии
  const demoDuration = 800;

  useEffect(() => {
    if (doDemoSwipe) {
      offset.value = withSequence(
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
  }, [MAX_WIDTH, doDemoSwipe, offset]);

  return (
    <Reanimated.View
      style={styles.root}
      entering={LightSpeedInLeft}
      exiting={LightSpeedOutRight}>
      <GestureDetector gesture={gesture}>
        <Reanimated.View style={[styles.movableWrapper, movableStyle]}>
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
        </Reanimated.View>
      </GestureDetector>
      <Reanimated.View style={styles.menuWrapper}>
        <CommonDeleteButton
          onPress={() => onDelete(todo.id)}
          style={styles.deleteButton}
        />
      </Reanimated.View>
      {/* <Reanimated.View style={[styles.gestureLever, menuStyle]}>
        <Text style={styles.testStyle}>aaa</Text>
        <CommonDeleteButton
          onPress={() => onDelete(todo.id)}
          style={styles.deleteButton}
        />
      </Reanimated.View> */}
    </Reanimated.View>
  );
};
