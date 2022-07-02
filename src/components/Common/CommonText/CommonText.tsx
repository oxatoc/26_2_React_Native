import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './CommonText.styles';
import {CommonHeaderProps} from './ComonText.types';

export const CommonText = ({
  children,
  style,
  kind = 'kind_header',
}: CommonHeaderProps) => (
  <View style={style}>
    <Text style={[styles.text, styles[kind]]}>{children}</Text>
  </View>
);
