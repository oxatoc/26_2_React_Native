import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';

export type CommonButtonLayoutProps = {
  children?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  hasBorder?: boolean;
  isDisabled?: boolean;
};
