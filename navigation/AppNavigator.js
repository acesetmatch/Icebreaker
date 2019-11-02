import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import RoomScreen from '../screens/RoomScreen';
import HomeScreen from '../screens/HomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import MatchedUserScreen from '../screens/MatchedUserScreen';
import CardSwipeScreen from '../screens/CardSwipeScreen';

export default createAppContainer(
  createStackNavigator(
    {
      Home: {
        screen: HomeScreen,
        path: '',
        navigationOptions: {
          header: null,
        },
      },
      SignUp: {
        screen: SignUpScreen,
        path: '',
        navigationOptions: ({ navigation }) => ({
          title: `${
            navigation.getParam('roomState', 'join') === 'create'
              ? 'Create'
              : 'Join'
          } Room`,
        }),
      },
      CardSwipe: {
        screen: CardSwipeScreen,
        path: '',
        navigationOptions: {
          title: 'Conversation Starters',
        },
      },
      Room: {
        screen: RoomScreen,
        path: '',
        navigationOptions: ({ navigation }) => ({
          title: navigation.getParam('roomCode', ''),
        }),
      },
      MatchedUser: {
        screen: MatchedUserScreen,
        path: '',
        navigationOptions: ({ navigation }) => ({
          title: "You and " + navigation.getParam('user', '').codename,
        }),
      }
    },
    {
      initialRouteName: 'Home',
    }
  )
);
