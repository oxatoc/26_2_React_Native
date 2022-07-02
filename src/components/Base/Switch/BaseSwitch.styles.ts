import {COLORS} from '@/constants/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    width: 36,
    height: 18,
    borderRadius: 9,
    position: 'relative',
  },
  lever: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.white,
    top: 2,
  },
});
