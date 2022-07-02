import {COLORS} from '@/constants/colors';
import React, {useEffect, useRef} from 'react';
import {Animated, Easing} from 'react-native';
import {styles} from './BaseSwitch.styles';
import {BaseSwitchProps} from './BaseSwitch.types';

export const BaseSwitch = ({value, onToggle, style}: BaseSwitchProps) => {
  const initialValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  const leftAnim = initialValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 20],
  });
  const backgroundAnim = initialValue.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.linkWater, COLORS.lightRoyalBlue],
  });

  const handlePress = () => {
    onToggle(!value);
  };

  useEffect(() => {
    const toValue = value ? 1 : 0;
    Animated.timing(initialValue, {
      toValue,
      useNativeDriver: false,
      duration: 300,
      easing: Easing.ease,
    }).start();
  }, [value]);

  return (
    <Animated.View
      style={[
        styles.wrapper,
        style,
        {
          backgroundColor: backgroundAnim,
        },
      ]}
      onTouchEnd={handlePress}>
      <Animated.View
        style={[
          styles.lever,

          {
            left: leftAnim,
          },
        ]}></Animated.View>
    </Animated.View>
  );
};
