import {QuestionIcon} from '@/components/BottomTabNavigator/QuestionIcon/QuestionIcon';
import {TasksIcon} from '@/components/BottomTabNavigator/TasksIcon/TasksIcon';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {BottomTabScreen} from '../../screens/BottomTabScreen/BottomTabScreen';
import {StackNavigation} from '../StackNavigator/StackNavigation';
import {BottomTabParams} from './BottomTabNavigator.types';

const BottomTab = createBottomTabNavigator<BottomTabParams>();

export const BottomTabNavigation = () => (
  <BottomTab.Navigator screenOptions={{headerShown: false}}>
    <BottomTab.Screen
      name="StackNavigation"
      component={StackNavigation}
      options={{
        title: 'Задачи',
        tabBarIcon: ({focused, color, size}) => (
          <TasksIcon focused={focused} color={color} size={size} />
        ),
      }}
    />
    <BottomTab.Screen
      name="BottomTabScreen"
      component={BottomTabScreen}
      options={{
        title: 'Второй экран',
        tabBarIcon: ({focused, color, size}) => (
          <QuestionIcon focused={focused} color={color} size={size} />
        ),
      }}
    />
  </BottomTab.Navigator>
);
