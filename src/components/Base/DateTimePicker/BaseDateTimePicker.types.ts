import {StyleProp, ViewStyle} from 'react-native';

export type DatePickerProps = {
  value?: Date;
  mode: 'date' | 'time';
  onChange: (date: Date) => void;
  style: StyleProp<ViewStyle>;
  minimumDate?: Date;
};
