import {SettingsIcon} from '@/components/BottomTabNavigator/SettingsIcon/SettingsIcon';
import {TasksIcon} from '@/components/BottomTabNavigator/TasksIcon/TasksIcon';
import {COLORS} from '@/constants/colors';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {BottomTabScreen} from '../../screens/BottomTabScreen/BottomTabScreen';
import {StackNavigation} from '../StackNavigator/StackNavigation';
import {BottomTabParams} from './BottomTabNavigator.types';

const BottomTab = createBottomTabNavigator<BottomTabParams>();

export const BottomTabNavigation = () => (
  <BottomTab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: COLORS.rhino,
      tabBarInactiveTintColor: COLORS.cadetGrey,
    }}>
    <BottomTab.Screen
      name="StackNavigation"
      component={StackNavigation}
      options={{
        title: 'Задачи',
        tabBarIcon: props => <TasksIcon {...props} />,
      }}
    />
    <BottomTab.Screen
      name="BottomTabScreen"
      component={BottomTabScreen}
      options={{
        title: 'Второй экран',
        tabBarIcon: props => <SettingsIcon {...props} />,
      }}
    />
  </BottomTab.Navigator>
);
