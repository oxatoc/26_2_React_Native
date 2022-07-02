import {ImageStyle, StyleProp} from 'react-native';

export type BaseThumbnailProps = {
  style?: StyleProp<ImageStyle>;
  uri?: string;
  kind?: 'kind_default' | 'kind_todo_details';
};
