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
          title: 'Ice Breaker',
        },
      },
      SignUp: {
        screen: SignUpScreen,
        path: '',
        navigationOptions: {
          title: 'Sign Up',
        },
      },
      CardSwipe: {
        screen: CardSwipeScreen,
        path: '',
        navigationOptions: {
          title: 'Swipe your questions',
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
          title: navigation.getParam('userObject', '').codeName,
        }),
      }
    },
    {
      initialRouteName: 'Home',
    }
  )
);
