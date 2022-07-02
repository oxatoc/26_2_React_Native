import {StyleProp, ViewStyle} from 'react-native';

export type BaseSwitchProps = {
  value: boolean;
  onToggle: (state: boolean) => void;
  style?: StyleProp<ViewStyle>;
};
