import React, {useCallback} from 'react';
import {TouchableOpacity} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Reanimated, {
  Easing,
  LightSpeedInLeft,
  LightSpeedOutRight,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {BaseCheckbox} from '../Base/Checkbox/BaseCheckbox';
import {BaseThumbnail} from '../Base/Thumbnail/BaseThumbnail';
import {CommonText} from '../Common/CommonText/CommonText';
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

  const animatedStyle = useAnimatedStyle(() => ({
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

  // const leverWidth = useSharedValue(0);
  // const animatedStyle = useAnimatedStyle(() => {
  //   return {
  //     width: leverWidth.value,
  //   };
  // });

  // const startWidth = useSharedValue(0);

  // const gesture = Gesture.Pan()
  //   .onUpdate(({translationX}) => {
  //     if (translationX === 0) {
  //       return;
  //     }

  //     if (translationX > 0) {
  //       leverWidth.value = Math.max(startWidth.value - translationX, 0);
  //       return;
  //     }

  //     if (leverWidth.value === MAX_WIDTH) {
  //       return;
  //     }
  //     if (translationX > -MAX_WIDTH) {
  //       leverWidth.value = -translationX;
  //     }
  //   })
  //   .onEnd(({translationX}) => {
  //     let length = Math.abs(translationX) / MAX_WIDTH;

  //     let endValue;

  //     if (translationX > 0) {
  //       endValue = length > GESTURE_THRESHOLD ? 0 : MAX_WIDTH;
  //     } else {
  //       endValue = length < GESTURE_THRESHOLD ? 0 : MAX_WIDTH;
  //     }

  //     leverWidth.value = withTiming(endValue, {
  //       duration: 300,
  //       easing:
  //         endValue === 0 ? Easing.in(Easing.ease) : Easing.out(Easing.ease),
  //     });
  //     startWidth.value = endValue;
  //   })
  //   .activeOffsetX([-10, 10]);

  // Демо свайпа при первом открытии
  // const demoDuration = 800;

  // useEffect(() => {
  //   if (doDemoSwipe) {
  //     leverWidth.value = withSequence(
  //       withTiming(MAX_WIDTH, {
  //         duration: demoDuration,
  //         easing: Easing.in(Easing.ease),
  //       }),
  //       withTiming(0, {
  //         duration: demoDuration,
  //         easing: Easing.out(Easing.ease),
  //       }),
  //     );
  //   }
  // }, [leverWidth, MAX_WIDTH, doDemoSwipe]);

  return (
    <Reanimated.View
      style={styles.root}
      entering={LightSpeedInLeft}
      exiting={LightSpeedOutRight}>
      <GestureDetector gesture={gesture}>
        <Reanimated.View style={[styles.movableWrapper, animatedStyle]}>
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
      {/* <Reanimated.View style={styles.gestureLever}>
        <CommonDeleteButton
          onPress={() => onDelete(todo.id)}
          style={styles.deleteButton}
        />
      </Reanimated.View> */}
    </Reanimated.View>
  );
};
