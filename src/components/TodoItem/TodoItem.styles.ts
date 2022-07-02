import {COLORS} from '@/constants/colors';
import {fonts} from '@/styles/fonts.styles';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  root: {
    marginVertical: 10,
    // alignItems: 'flex-start',
    flexDirection: 'row',
  },
  deleteButton: {
    width: 38,
    height: 38,
    marginLeft: 'auto',
  },
  gestureLever: {
    backgroundColor: COLORS.linkWater,
    borderRadius: 10,
    // borderWidth: 1,
  },
  shrinkableWrapper: {
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'flex-start',
  },
  todoText: {
    ...fonts.dMSans700,
    fontSize: 14,
    lineHeight: 17,
    color: COLORS.rhino,
    textAlign: 'left',
  },
  todoTextWrapper: {
    flexGrow: 1,
    flexBasis: 0,
    marginLeft: 16,
    marginRight: 8,
  },
  thumbnail: {
    marginRight: 16,
  },
  thumbnailsWrapper: {
    flexDirection: 'row',
    marginTop: 16,
  },
});
