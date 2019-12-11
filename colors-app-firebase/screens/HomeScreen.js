import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Image,
  Dimensions,
  StatusBar,
  ScrollView,
  Button,
  SafeAreaView,
  FlatList,
  Platform,
} from 'react-native';
import Constants from 'expo-constants';
import ReusableButton from '../components/ReusableButton';
import Logo from '../components/Logo';
import { StackActions, NavigationActions } from 'react-navigation';
import ColorCard from '../components/ColorCard';

import { db, app } from '../src/config/db';
let colorsRef = db.ref('/colors');

export var rgbToHex = rgb => {
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
    hex = '0' + hex;
  }
  return hex;
};

export var fullColorHex = (r, g, b) => {
  var red = rgbToHex(r);
  var green = rgbToHex(g);
  var blue = rgbToHex(b);
  return '#' + red + green + blue;
};

export default class HomeScreen extends React.Component {
  refreshColors = async () => {
    colorsRef.on(
      'value',
      function(snapshot) {
        let data = snapshot.val();

        if (data != null) {
          let items = Object.values(data);
          this.setState({
            colors: items,
          });
        } else {
          Alert.alert('Colors App', 'Could not fetch data');
        }
      }.bind(this)
    );
  };

  componentDidMount() {
    this.props.navigation.setParams({
      _handleButtonAddColorClicked: this.handleButtonAddColorClicked,
      _handleButtonLogoutClicked: this.handleButtonLogoutClicked,
    });
  }

  handleButtonLogoutClicked = () => {
    //this.props.navigation.navigate('Home')
    const resetAction = StackActions.reset({
      index: 0, // <-- currect active route from actions array
      actions: [NavigationActions.navigate({ routeName: 'Main' })],
    });

    this.props.navigation.dispatch(resetAction);
  };

  didAddColor = newColor => {
    this.state.colors.push(newColor);
  };

  handleButtonAddColorClicked = () => {
    const pushAction = StackActions.push({
      routeName: 'AddColor',
      params: {
        color: '#0000ff',
        callBack: this.didAddColor,
      },
    });

    this.props.navigation.dispatch(pushAction);
  };

  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => {
    const {
      state: { params = {} },
    } = navigation;
    return {
      title: 'Colors App',
      headerStyle: {
        backgroundColor: '#34a7a7',
      },
      headerTintColor: '#fff',
      headerRight: (
        <Button
          onPress={navigation.getParam('_handleButtonAddColorClicked')}
          title="Add"
          color={Platform.OS === 'ios' ? '#fff' : '#ee1d23'}
        />
      ),
      headerLeft: (
        <Button
          onPress={navigation.getParam('_handleButtonLogoutClicked')}
          title="Logout"
          color={Platform.OS === 'ios' ? '#fff' : '#ee1d23'}
        />
      ),
    };
  };

  componentWillMount() {
    const { state } = this.props.navigation;
    const name = this.props.navigation.getParam('name', 'Peter');
    console.log('New Color Home: ' + name);
    this.refreshColors();
  }

  state = {
    colors: [
      {
        id: 'nocolor',
        name: 'Fetching...',
        color: {
          red: 255,
          green: 0,
          blue: 0,
        },
      },
    ],
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#ee1d23" barStyle="light-content" />

        <SafeAreaView style={styles.container}>
          <FlatList
            data={this.state.colors}
            renderItem={({ item }) => (
              <ColorCard
                name={item.name}
                backgroundColor={fullColorHex(
                  item.color.red,
                  item.color.green,
                  item.color.blue
                )}
              />
            )}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 4,
    backgroundColor: '#fff',
    padding: 8,
  },
});
