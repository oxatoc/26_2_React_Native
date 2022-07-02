import {StyleProp, TextStyle} from 'react-native';

export type BaseTextInputProps = {
  onSubmit?: (text: string) => void;
  placeholder?: string;
  value?: string;
  style?: StyleProp<TextStyle>;
  disabled?: boolean;
};
