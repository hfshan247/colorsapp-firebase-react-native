import * as React from 'react';
import { Text, View, StyleSheet, Alert, Image, Dimensions, StatusBar, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import ReusableButton from '../components/ReusableButton';
import Logo from '../components/Logo';
import { StackActions, NavigationActions } from 'react-navigation';

export default class MainScreen extends React.Component {
  handleClickButtonLogin = () => {
    // const resetAction = StackActions.reset({
    //   index: 0, // <-- currect active route from actions array
    //   actions: [NavigationActions.navigate({ routeName: 'Login' })],
    // });

    // this.props.navigation.dispatch(resetAction);

    this.props.navigation.navigate('Login')
  };

  handleClickButtonSignup = () => {
    // const resetAction = StackActions.reset({
    //   index: 0, // <-- currect active route from actions array
    //   actions: [NavigationActions.navigate({ routeName: 'Signup' })],
    // });

    // this.props.navigation.dispatch(resetAction);
    this.props.navigation.navigate('Signup')
  };

  static navigationOptions = {
    title: 'Colors App',
    headerStyle: {
      backgroundColor: '#34a7a7',
    },
    headerTintColor: '#fff',
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#ee1d23" barStyle="light-content" />
        <Logo />
        <ReusableButton title="Login" backgroundColor="#33a7a7" handleClick={this.handleClickButtonLogin}/>
        <ReusableButton title="Signup" backgroundColor="#0b9689" handleClick={this.handleClickButtonSignup}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: '#ffffff',
  },
});
