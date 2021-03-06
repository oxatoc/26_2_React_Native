import {COLORS} from '@/constants/colors';
import {fonts} from '@/styles/fonts.styles';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  kind_header: {
    ...fonts.nunito700,
    fontSize: 24,
    lineHeight: 32,
  },
  kind_plain: {
    ...fonts.nunito500,
    fontSize: 14,
    lineHeight: 17,
  },
  kind_value: {
    ...fonts.nunito700,
    fontSize: 14,
    lineHeight: 17,
  },
  text: {
    color: COLORS.rhino,
  },
});
