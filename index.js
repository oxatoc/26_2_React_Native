/**
 * @format
 */

import notificationService from '@/services/todoNotificationService';
import notifee from '@notifee/react-native';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

notifee.onBackgroundEvent(async ({type, detail}) => {
  notificationService.handleEvent(type, detail);
});

AppRegistry.registerComponent(appName, () => App);
