import {BORDER} from '@/constants/border';
import {COLORS} from '@/constants/colors';
import {fonts} from '@/styles/fonts.styles';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  root: {
    marginVertical: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.linkWater,
    borderTopRightRadius: BORDER.radius,
    borderBottomRightRadius: BORDER.radius,
    // borderWidth: 1,
  },
  deleteButton: {
    width: 38,
    height: 38,
    marginLeft: 'auto',
  },
  menuWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: -10,
  },
  movableWrapper: {
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'flex-start',
    backgroundColor: COLORS.white,
    borderTopRightRadius: BORDER.radius,
    borderBottomRightRadius: BORDER.radius,
    minHeight: 38,
  },
  todoText: {
    ...fonts.nunito700,
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
    marginRight: 8,
  },
  thumbnailsWrapper: {
    flexDirection: 'row',
    marginTop: 16,
  },
});
