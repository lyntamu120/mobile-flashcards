import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

class NewDeck extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What's the title of your new deck?</Text>
        <TextInput style={styles.textInput} />
        <TouchableOpacity
          onPress={this.onSubmit}
          style={styles.button}
        >
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#888',
    padding: 8,
    alignItems: 'center',
    width: 180,
    marginTop: 30
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    marginTop: 40,
    width: 280
  },
  title: {
    fontSize: 40,
    fontFamily: 'Cochin',
    textAlign: 'center'
  }
});

export default NewDeck;
