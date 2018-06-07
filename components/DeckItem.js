import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class DeckItem extends Component {
  render() {
    const { title, numOfCards, navigate } = this.props;
    return (
      <TouchableOpacity
        style={styles.box}
        onPress={() => {
          if (navigate) {
            navigate('Deck', { title });
          }
        }}
      >
        <Text style={[styles.text, {color: 'green'}]}>{ title }</Text>
        <Text style={styles.text}>{ numOfCards } cards</Text>
      </TouchableOpacity>
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
