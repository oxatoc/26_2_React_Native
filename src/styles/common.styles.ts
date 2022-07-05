import {COLORS} from '@/constants/colors';
import {StyleSheet} from 'react-native';
import {fonts} from './fonts.styles';

export const common = StyleSheet.create({
  screenHeader: {
    ...fonts.nunito700,
    fontSize: 34,
    lineHeight: 42,
    color: COLORS.rhino,
  },
});
