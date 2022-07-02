import {COLORS} from '@/constants/colors';
import {fonts} from '@/styles/fonts.styles';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'flex-start',
  },
  gestureLever: {
    width: 25,
    height: 25,
    backgroundColor: '#CCCCCC',
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
    alignSelf: 'stretch',
  },
  thumbnail: {
    marginRight: 16,
  },
  thumbnailsWrapper: {
    flexDirection: 'row',
    marginTop: 16,
  },
});
