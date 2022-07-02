import {NavigatorScreenParams} from '@react-navigation/native';
import {RootStackParams} from '../StackNavigator/StackNavigation.types';

export type BottomTabParams = {
  StackNavigation: NavigatorScreenParams<RootStackParams>;
  BottomTabScreen: undefined;
};
