import {COLORS} from '@/constants/colors';
import React, {useEffect} from 'react';
import Reanimated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, {Path} from 'react-native-svg';
import {styles} from './BaseCheckbox.styles';
import {BaseCheckboxProps} from './BaseCheckbox.types';

export const BaseCheckbox = ({checked, onPress, style}: BaseCheckboxProps) => {
  // const initialValue = useRef(new Animated.Value(0)).current;
  // const borderAnim = initialValue.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [COLORS.rockBlue, COLORS.lightRoyalBlue],
  // });

  // useEffect(() => {
  //   Animated.spring(initialValue, {
  //     toValue: !checked ? 0 : 1,
  //     useNativeDriver: false,
  //   }).start();
  // }, [checked, initialValue]);

  // const backgroundAnim = initialValue.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [COLORS.transparent, COLORS.lightRoyalBlue],
  // });

  // const handlePress = () => {
  //   Animated.spring(initialValue, {
  //     toValue: checked ? 0 : 1,
  //     useNativeDriver: false,
  //   }).start(() => {
  //     onPress();
  //   });
  // };

  const getBackground = (checkedValue: boolean) =>
    checkedValue ? COLORS.lightRoyalBlue : COLORS.transparent;

  const getBorder = (checkedValue: boolean) =>
    checkedValue ? COLORS.lightRoyalBlue : COLORS.rockBlue;

  const backgroundStyle = useSharedValue(getBackground(checked));

  const borderStyle = useSharedValue(getBorder(checked));

  useEffect(() => {
    backgroundStyle.value = getBackground(checked);

    borderStyle.value = getBorder(checked);
  }, [backgroundStyle, borderStyle, checked]);

  const animation = {
    duration: 300,
    easing: Easing.ease,
  };

  const handlePress = () => {
    backgroundStyle.value = withTiming(
      !checked ? COLORS.lightRoyalBlue : COLORS.transparent,
      animation,
      () => runOnJS(onPress)(),
    );

    borderStyle.value = withTiming(
      !checked ? COLORS.lightRoyalBlue : COLORS.rockBlue,
      animation,
    );
  };

  // const isChecked = useSharedValue(checked);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundStyle.value,
      borderColor: borderStyle.value,
    };
  });

  return (
    <Reanimated.View
      style={[styles.root, style, animatedStyles]}
      onTouchStart={handlePress}>
      <Svg width="15" height="15" viewBox="0 0 18 18" fill="none">
        <Path
          d="M7.71 13.29C7.32 13.68 6.69 13.68 6.3 13.29L2.71 9.7C2.32 9.31 2.32 8.68 2.71 8.29C3.1 7.9 3.73 7.9 4.12 8.29L7 11.17L13.88 4.29C14.27 3.9 14.9 3.9 15.29 4.29C15.68 4.68 15.68 5.31 15.29 5.7L7.71 13.29Z"
          fill={COLORS.white}
        />
      </Svg>
    </Reanimated.View>
    //   <Animated.View
    //   onTouchEnd={handlePress}
    //   style={[
    //     styles.root,
    //     style,
    //     {
    //       borderColor: borderAnim,
    //       backgroundColor: backgroundAnim,
    //     },
    //   ]}>
    //   {true && (
    //     <Svg width="15" height="15" viewBox="0 0 18 18" fill="none">
    //       <Path
    //         d="M7.71 13.29C7.32 13.68 6.69 13.68 6.3 13.29L2.71 9.7C2.32 9.31 2.32 8.68 2.71 8.29C3.1 7.9 3.73 7.9 4.12 8.29L7 11.17L13.88 4.29C14.27 3.9 14.9 3.9 15.29 4.29C15.68 4.68 15.68 5.31 15.29 5.7L7.71 13.29Z"
    //         fill={COLORS.white}
    //       />
    //     </Svg>
    //   )}
    // </Animated.View>
  );
};
