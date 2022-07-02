import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './CommonLabel.styles';
import {CommonLabelProps} from './CommonLabel.types';

export const CommonLabel = ({children, style}: CommonLabelProps) => (
  <View style={style}>
    <Text style={styles.text}>{children}</Text>
  </View>
);
