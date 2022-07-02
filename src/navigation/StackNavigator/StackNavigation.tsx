import {CommonBackButton} from '@/components/Common/BackButton/CommonBackButton';
import {ImageFull} from '@/screens/ImageFull/ImageFull';
import {TodoDetails} from '@/screens/TodoDetails/TodoDetails';
import {common} from '@/styles/common.styles';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {TodoList} from '../../screens/TodoList/TodoList';
import {styles} from './StackNavigation.styles';
import {RootStackParams} from './StackNavigation.types';

const RootStack = createStackNavigator<RootStackParams>();

export const StackNavigation = () => (
  <RootStack.Navigator
    initialRouteName="TodoList"
    screenOptions={{
      cardStyle: styles.cardStyle,
      headerTitleStyle: common.screenHeader,
      headerTitleAlign: 'center',
    }}>
    <RootStack.Screen
      name="TodoList"
      component={TodoList}
      options={{
        title: 'Задачи',
      }}
    />
    <RootStack.Screen
      name="TodoDetails"
      component={TodoDetails}
      options={{
        headerLeft: ({onPress}) => <CommonBackButton onPress={onPress} />,
        title: 'Задача',
      }}
    />
    <RootStack.Group screenOptions={{presentation: 'modal'}}>
      <RootStack.Screen
        name="ImageFull"
        component={ImageFull}
        options={{
          headerLeft: ({onPress}) => <CommonBackButton onPress={onPress} />,
          title: 'Вложение',
        }}
      />
    </RootStack.Group>
  </RootStack.Navigator>
);
