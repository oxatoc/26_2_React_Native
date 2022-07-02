import {StyleProp, ViewStyle} from 'react-native';

export type BaseCheckboxProps = {
  checked: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};
