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

  // const offset = useSharedValue(0);
  const leverWidth = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      // transform: [{translateX: offset.value}],
      width: leverWidth.value,
    };
  });

  // const start = useSharedValue(0);
  // const MAX_OFFSET = -80;
  const MAX_WIDTH = 80;
  const startWidth = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate(e => {
      const offset = e.translationX - startWidth.value;

      if (offset > 0) {
        leverWidth.value = Math.max(MAX_WIDTH - offset, 0);
        return;
      }

      if (offset >= -MAX_WIDTH) {
        leverWidth.value = -offset;
      }

      // if (e.translationX < -start.value && e.translationX > MAX_OFFSET) {
      //   leverWidth.value = Math.abs(e.translationX + start.value);
      //   // offset.value = e.translationX + start.value;
      // }
    })
    .onEnd(() => {
      // start.value = offset.value;
      // leverWidth.value = 0;
    });

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
