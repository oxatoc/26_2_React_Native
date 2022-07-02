import {COLORS} from '@/constants/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  root: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.zircon,
    backgroundColor: COLORS.zircon,
    alignItems: 'center',
  },
  border: {
    borderWidth: 1,
    borderColor: COLORS.lightRoyalBlue,
  },
  isDisabled: {
    opacity: 0.5,
  },
});
