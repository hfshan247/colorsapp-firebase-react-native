import * as React from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';

export default class Logo extends React.Component {
  render() {
    return (
        <View style={styles.logoView}>
          <Image style={styles.logoImage} source={require('../assets/Icon-App.png')} />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    logoView:{
    width: Dimensions.get('window').width - 16,
    height: Dimensions.get('window').width - 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
    logoImage:{
    height: 250,
    width: 250,
  },
});