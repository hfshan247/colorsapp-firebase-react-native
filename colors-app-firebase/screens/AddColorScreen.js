import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Dimensions,
  StatusBar,
  TextInput,
  Keyboard,
  Slider,
  ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
import ReusableButton from '../components/ReusableButton';
import Logo from '../components/Logo';
import { StackActions, NavigationActions } from 'react-navigation';
import { Card } from 'react-native-paper';
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

export default class AddColorScreen extends React.Component {
  static navigationOptions = {
    title: 'Add Color',
    headerStyle: {
      backgroundColor: '#34a7a7',
    },
    headerTintColor: '#fff',
  };

  componentWillMount() {
    this.setState({ color: this.props.navigation.state.params.color });
  }

  addColorToFirebase = () => {
    console.log('adding to firebase');
    var key = colorsRef.push();
    this.setState({
      hexColor: fullColorHex(
        this.state.newColor.color.red,
        this.state.newColor.color.green,
        this.state.newColor.color.blue
      ),
      newColor: {
        id: key,
        name: this.state.newColor.name,
        color: {
          red: this.state.newColor.color.red,
          green: this.state.newColor.color.green,
          blue: this.state.newColor.color.blue,
        },
      },
    });

    colorsRef.push(
      this.state.newColor,
      function(error) {
        if (error) {
          Alert.alert('Colors App', 'Error while adding color');
        } else {
          // Data saved successfully!
          Alert.alert('Colors App', 'Color was Added');
          this.props.navigation.goBack();
        }
      }.bind(this)
    );
  };

  handleButtonAddColorClicked = () => {
    // this.props.navigation.state.params.callBack(this.state.newColor);
    // this.props.navigation.goBack();
    this.addColorToFirebase();
  };

  handleButtonCancelClicked = () => {
    // this.props.navigation.setParams({ name: 'Lucy' })
    // const name = this.props.navigation.getParam('name');
    // console.log('params:' + name)

    // const popAction = StackActions.pop({name:'new color add'});

    // this.props.navigation.dispatch(popAction);

    this.props.navigation.goBack();
  };

  constructor(props) {
    super(props);
  }

  state = {
    hexColor: '#ffffff',
    newColor: {
      id: 'd',
      name: '',
      color: {
        red: 255,
        green: 255,
        blue: 255,
      },
    },
  };

  handleSliderChangeRed = value => {
    this.setState({
      hexColor: fullColorHex(
        value,
        this.state.newColor.color.green,
        this.state.newColor.color.blue
      ),
      newColor: {
        id: 'id',
        name: this.state.newColor.name,
        color: {
          red: value,
          green: this.state.newColor.color.green,
          blue: this.state.newColor.color.blue,
        },
      },
    });
  };
  handleSliderChangeGreen = value => {
    this.setState({
      hexColor: fullColorHex(
        this.state.newColor.color.red,
        value,
        this.state.newColor.color.blue
      ),
      newColor: {
        id: 'id',
        name: this.state.newColor.name,
        color: {
          red: this.state.newColor.color.red,
          green: value,
          blue: this.state.newColor.color.blue,
        },
      },
    });
  };
  handleSliderChangeBlue = value => {
    this.setState({
      hexColor: fullColorHex(
        this.state.newColor.color.red,
        this.state.newColor.color.green,
        value
      ),
      newColor: {
        id: 'id',
        name: this.state.newColor.name,
        color: {
          red: this.state.newColor.color.red,
          green: this.state.newColor.color.green,
          blue: value,
        },
      },
    });
  };

  handleTextChange = value => {
    this.setState({
      newColor: {
        name: value,
        color: {
          red: this.state.newColor.color.red,
          green: this.state.newColor.color.green,
          blue: this.state.newColor.color.blue,
        },
      },
    });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <StatusBar backgroundColor="#ee1d23" barStyle="light-content" />

        <ColorCard
          backgroundColor={this.state.hexColor}
          name={this.state.newColor.name}
        />

        <View style={styles.backgroundWrapper}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter color name"
              keyboardType="default"
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
              onChangeText={this.handleTextChange}
            />
          </View>
        </View>

        <Slider
          step={1}
          maximumValue={255}
          onValueChange={this.handleSliderChangeRed}
          value={255}
        />
        <Slider
          step={1}
          maximumValue={255}
          onValueChange={this.handleSliderChangeGreen}
          value={255}
        />
        <Slider
          step={1}
          maximumValue={255}
          onValueChange={this.handleSliderChangeBlue}
          value={255}
        />

        {/* Button Login*/}
        <ReusableButton
          title="Add Color"
          backgroundColor="#33a7a7"
          handleClick={this.handleButtonAddColorClicked}
        />
        <ReusableButton
          title="Cancel"
          backgroundColor="red"
          handleClick={this.handleButtonCancelClicked}
        />
      </ScrollView>
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

  backgroundWrapper: {
    marginTop: 16,
    flexDirection: 'row',
    width: Dimensions.get('window').width - 16,
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },

  inputWrapper: {
    alignSelf: 'center',
    width: Dimensions.get('window').width - 140,
    height: 35,
    justifyContent: 'center',
    marginLeft: 8,
  },

  input: {
    fontWeight: 'bold',
    height: 35,
  },
});
