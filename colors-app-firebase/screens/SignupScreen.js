import * as React from 'react';
import { Text, View, StyleSheet, Alert, Dimensions, StatusBar, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import UsernameInput from '../components/UsernameInput'
import PasswordInput from '../components/PasswordInput'
import ReusableButton from '../components/ReusableButton'
import { StackActions, NavigationActions } from 'react-navigation';

import { db, app } from './src/config/db';
let balanceRef = db.ref('/balance');

export default class SignupScreen extends React.Component {


  state:{
    username:"",
    password:"",
    verifyPassword:""
  }

    proceedToSignup = () => {
    var {password, username } = this.state
    app.auth().createUserWithEmailAndPassword(username, password)
      .then(
        () => {
          Alert.alert("Colors App", "You've signed up successfully")

          // var user = app.auth().currentUser;
          // if (user) {
          //   var dbRef = db.ref('/balance');
          //   dbRef.child(user.uid).set({
          //     balance: 0,
          //     currency: 'PKR'
          //   });
          // } else {
          //   // No user is signed in.
          // }

          this.goToMainPage()
        }
      )
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        Alert.alert("Colors App", errorMessage)
        // ...
      });
  }

  goToMainPage = () => {
    const resetAction = StackActions.reset({
      index: 0, // <-- currect active route from actions array
      actions: [NavigationActions.navigate({ routeName: 'Main' })],
    });

    this.props.navigation.dispatch(resetAction);
  }

  handleClickButtonSignup = () => {

    if(this.state.username === '' || this.state.username === null){
      Alert.alert("Colors App", "Username cannot be empty")
    }
    else if(this.state.password === ''  || this.state.password === null){
      Alert.alert("Colors App", "Password cannot be empty")
    }
    else if(this.state.verifyPassword === ''  || this.state.verifyPassword === null){
      Alert.alert("Colors App", "Verify Password cannot be empty")
    }
    else if(this.state.password !== this.state.verifyPassword){
      Alert.alert("Colors App", "Please verify your password")
    }
    else{
      this.proceedToSignup()
    }
        
    // const resetAction = StackActions.reset({
    //   index: 0, // <-- currect active route from actions array
    //   actions: [NavigationActions.navigate({ routeName: 'Main' })],
    // });

    // this.props.navigation.dispatch(resetAction);
  };

  handleClickButtonBack = () => {
            //this.props.navigation.navigate('Home')
    const resetAction = StackActions.reset({
      index: 0, // <-- currect active route from actions array
      actions: [NavigationActions.navigate({ routeName: 'Main' })],
    });

    this.props.navigation.dispatch(resetAction);
  };

  static navigationOptions = {
    title: 'Signup',
    headerStyle: {
      backgroundColor: '#34a7a7',
    },
    headerTintColor: '#fff',
  };

  handleChangeUsername = (input) =>{
    this.setState({username:input})
  }
  handleChangePassword = (input) =>{
    this.setState({password:input})
  }
  handleChangeVerifyPassword = (input) =>{
    this.setState({verifyPassword:input})
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#ee1d23" barStyle="light-content" />
        <UsernameInput changeUserText={this.handleChangeUsername}/>
        <PasswordInput changePasswordText={this.handleChangePassword}/>
        <PasswordInput changePasswordText={this.handleChangeVerifyPassword}/>
        <ReusableButton title='Signup' backgroundColor='#33a7a7' handleClick={this.handleClickButtonSignup}/>
        <ReusableButton title='Back' backgroundColor='#0b9689' handleClick={this.handleClickButtonBack}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: '#ffffff',
  },
});
