import * as React from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';

export default class ColorCard extends React.Component {
  render() {
    return (
          <Card style={{ marginTop: 12, backgroundColor: this.props.backgroundColor }}>
          <View
            style={styles.cardWrapper}>
            <Text style={styles.nameText}>
              {this.props.name === '' ? 'No Name' : this.props.name}
            </Text>
          </View>
        </Card>
    );
  }
}

const styles = StyleSheet.create({
  cardWrapper:{
    width: Dimensions.get('window').width - 16,
    height: Dimensions.get('window').width / 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
    nameText:{
       marginLeft: 20, fontSize: 35, fontWeight: 'bold' 
  },
});