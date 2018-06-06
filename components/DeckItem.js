import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class DeckItem extends Component {
  render() {
    const { title, numOfCards } = this.props;
    return (
      <View style={styles.box}>
        <Text style={[styles.text, {color: 'green'}]}>{ title }</Text>
        <Text style={styles.text}>{ numOfCards } cards</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Cochin'
  },
  box: {
    marginTop: 5,
    borderBottomColor: 'yellow',
    borderBottomWidth: 2,
    paddingTop: 5,
    paddingBottom: 5
  }
});
export default DeckItem;
