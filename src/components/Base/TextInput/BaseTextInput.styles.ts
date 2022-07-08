import {COLORS} from '@/constants/colors';
import {fonts} from '@/styles/fonts.styles';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  input: {
    ...fonts.nunito500,
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 20,
    paddingVertical: 11,
    backgroundColor: COLORS.zircon,
    borderRadius: 49,
    borderWidth: 1,
  },
  focused: {
    borderColor: COLORS.rhino,
    color: COLORS.rhino,
  },
  unfocused: {
    borderColor: COLORS.zircon,
    color: COLORS.cadetGrey,
  },
});
