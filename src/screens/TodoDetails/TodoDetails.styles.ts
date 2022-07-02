import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  rootContentContainer: {
    paddingTop: 16,
    minHeight: '100%',
  },
  addButton: {
    width: 200,
    alignSelf: 'center',
    marginTop: 'auto',
  },
  addButtonWrapper: {
    flexGrow: 1,
  },
  assetsItem: {
    marginRight: 16,
    marginBottom: 16,
  },
  assetsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  customNotificationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  defaultNotificationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    flex: 1,
  },
  pickerDate: {
    marginRight: 16,
  },
  pickerWrapper: {
    flexGrow: 1,
  },
  switchWrapper: {
    flexDirection: 'row',
  },
  todoLabel: {
    marginBottom: 8,
  },
  section: {
    marginBottom: 32,
  },
});
