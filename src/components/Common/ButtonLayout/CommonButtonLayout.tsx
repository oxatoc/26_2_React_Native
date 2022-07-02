import React from 'react';
import {TouchableOpacity} from 'react-native';
import {styles} from './CommonButtonLayout.styles';
import {CommonButtonLayoutProps} from './CommonButtonLayout.types';

export const CommonButtonLayout = ({
  children,
  onPress,
  style,
  hasBorder = false,
  isDisabled = false,
}: CommonButtonLayoutProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.root,
      style,
      hasBorder && styles.border,
      isDisabled && styles.isDisabled,
    ]}
    disabled={isDisabled}>
    {children}
  </TouchableOpacity>
);
