import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

export default class ReusableButton extends React.Component {
  render() {
    return (
      <TouchableOpacity style={[styles.buttonStyle, {backgroundColor:this.props.backgroundColor}]} onPress={this.props.handleClick}>
        <Text style={styles.buttonTitle}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor:'black',
    marginTop:8
  },
  buttonTitle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  }
});
