import React from 'react';
import {Text} from 'react-native';
import {CommonButtonLayout} from '../../Common/ButtonLayout/CommonButtonLayout';
import {styles} from './BaseButton.styles';
import {BaseButtonProps} from './BaseButton.types';

export const BaseButton = ({
  children,
  onPress,
  isDisabled = false,
  style,
}: BaseButtonProps) => (
  <CommonButtonLayout
    onPress={onPress}
    hasBorder={true}
    isDisabled={isDisabled}
    style={style}>
    <Text style={styles.caption}>{children}</Text>
  </CommonButtonLayout>
);
