import * as React from 'react';
import { Text, View, StyleSheet, Alert, Image, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import MainScreen from './screens/MainScreen'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import HomeScreen from './screens/HomeScreen'
import AddColorScreen from './screens/AddColorScreen'

import {
  createAppContainer,
  StackActions,
  NavigationActions,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


const RootStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    Main: {
      screen: MainScreen,
    },
    Signup: {
      screen: SignupScreen,
    },
    Home: {
      screen: HomeScreen,
    },
    AddColor: {
      screen: AddColorScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}