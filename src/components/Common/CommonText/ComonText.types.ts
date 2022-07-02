import React from 'react';
import {StyleProp, TextStyle} from 'react-native';

export type CommonHeaderProps = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  kind?: 'kind_header' | 'kind_plain' | 'kind_value';
};
