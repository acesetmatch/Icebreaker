import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import RoomScreen from '../screens/RoomScreen';
import HomeScreen from '../screens/HomeScreen';

export default createAppContainer(
  createStackNavigator(
    {
      Home: {
        screen: HomeScreen,
        path: '',
        navigationOptions: {
          title: 'Ice Breaker',
        },
      },
      Room: {
        screen: RoomScreen,
        path: '',
        navigationOptions: ({ navigation }) => ({
          title: navigation.getParam('roomCode', ''),
        }),
      },
    },
    {
      initialRouteName: 'Home',
    }
  )
);
