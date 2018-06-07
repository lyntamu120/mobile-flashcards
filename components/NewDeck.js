import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { addDeck } from '../actions';
import { saveDeckTitle } from '../utils/helpers';

class NewDeck extends Component {
  state = {
    deckName: null
  }
  onSubmit = () => {
    const { deckName } = this.state;
    const { decks, dispatch, navigation } = this.props;
    // Save to DB && Update the store
    saveDeckTitle(deckName)
      .then(() => {
        return dispatch(addDeck(deckName));
      })
      .catch(e => console.log('Error when saving new title', e));
    // Redirect to decksList
    navigation.goBack();
  }
  onChangeText = (deckName) => {
    this.setState(() => ({ deckName }));
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What's the title of your new deck?</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={this.onChangeText}
          value={this.state.deckName}
        />
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
    width: 280,
    padding: 1,
    fontFamily: 'Cochin'
  },
  title: {
    fontSize: 40,
    fontFamily: 'Cochin',
    textAlign: 'center'
  }
});

function mapStateToProps(decks) {
  return { decks }
}

export default connect(mapStateToProps)(NewDeck);
