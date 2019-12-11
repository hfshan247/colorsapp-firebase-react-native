import * as React from 'react';
import { Text, View, StyleSheet, Alert, Dimensions, StatusBar, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import UsernameInput from '../components/UsernameInput'
import PasswordInput from '../components/PasswordInput'
import ReusableButton from '../components/ReusableButton'
import { StackActions, NavigationActions } from 'react-navigation';
import { db, app } from './src/config/db';
let balanceRef = db.ref('/balance');

export default class LoginScreen extends React.Component {

  state:{
    username:"",
    password:"",
  }

  goToHomePage = () => {
        const resetAction = StackActions.reset({
      index: 0, // <-- currect active route from actions array
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });

    this.props.navigation.dispatch(resetAction);
  }

  proceedToLogin = () => {
        // Sign in existing user\
    var {password, username } = this.state
    app.auth().signInWithEmailAndPassword(username, password)
      .then(
        () => {
          var user = app.auth().currentUser;
        
          Alert.alert("Colors App", "You've logged in successfully")
          this.goToHomePage()
        }
      )
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        Alert.alert("Colors App", errorMessage)
      });
  }

  handleClickButtonLogin = () => {
        //this.props.navigation.navigate('Home')
    // const resetAction = StackActions.reset({
    //   index: 0, // <-- currect active route from actions array
    //   actions: [NavigationActions.navigate({ routeName: 'Home' })],
    // });

    // this.props.navigation.dispatch(resetAction);

       if(this.state.username == ''){
      Alert.alert("Colors App", "Username cannot be empty")
    }
    else if(this.state.password == ''  ){
      Alert.alert("Colors App", "Password cannot be empty")
    }
    else{
      this.proceedToLogin()
    }
    
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
    title: 'Login',
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

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#ee1d23" barStyle="light-content" />
        <UsernameInput changeUserText={this.handleChangeUsername}/>
        <PasswordInput changePasswordText={this.handleChangePassword}/>
        <ReusableButton title='Login' backgroundColor='#33a7a7' handleClick={this.handleClickButtonLogin}/>
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
