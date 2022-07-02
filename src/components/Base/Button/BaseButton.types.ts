import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';

export type BaseButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
  isDisabled?: boolean;
  style?: StyleProp<ViewStyle>;
};
