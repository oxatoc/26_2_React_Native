import {BORDER} from '@/constants/border';
import {COLORS} from '@/constants/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  image: {
    backgroundColor: COLORS.zircon,
  },
  kind_default: {
    width: 38,
    height: 38,
    borderRadius: BORDER.radius,
  },
  kind_todo_details: {
    width: 76,
    height: 76,
    borderRadius: BORDER.radius,
  },
});
