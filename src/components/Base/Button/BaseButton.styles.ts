import {COLORS} from '@/constants/colors';
import {fonts} from '@/styles/fonts.styles';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  caption: {
    ...fonts.nunito500,
    fontSize: 14,
    lineHeight: 17,
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 70,
    color: COLORS.lightRoyalBlue,
  },
});
