/**
 * @format
 */

// 'react-native-gesture-handler' должен импортироваться самым первым
// см. https://reactnavigation.org/docs/stack-navigator/
// @ts-ignore
import 'react-native-gesture-handler';

import {BottomTabParams} from '@/navigation/BottomNavigator/BottomTabNavigator.types';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {BottomTabNavigation} from './src/navigation/BottomNavigator/BottomTabNavigation';
import {persistor, store} from './src/store';

export const navRef = createNavigationContainerRef<BottomTabParams>();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <NavigationContainer ref={navRef}>
            <BottomTabNavigation />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
