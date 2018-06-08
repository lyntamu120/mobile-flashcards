import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { addCard } from '../actions';
import { addCardToDeck } from '../utils/helpers';

class NewCard extends Component {
  state = {
    question: null,
    answer: null
  }
  onSubmit = () => {
    const { dispatch, navigation } = this.props;
    const { title } = navigation.state.params;
    const { question, answer } = this.state;
    // dispatch addCard and add card to DB
    addCardToDeck(title, { question, answer})
      .then(() => dispatch(addCard(title, { question, answer })) )
      .catch(e => console.log('Error when add new card: ', e))
    // goBack
    navigation.goBack();
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={(question) => this.setState(() => ({ question }))}
          value={this.state.question}
          placeholder="what's your question"
        />
        <TextInput
          style={[styles.textInput, {height: 80}]}
          onChangeText={(answer) => this.setState(() => ({ answer }))}
          value={this.state.answer}
          multiline = {true}
          numberOfLines = {4}
          placeholder="what's your answer"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.onSubmit}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    width: 280,
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    marginBottom: 10,
    fontFamily: 'Cochin',
    fontSize: 18
  },
  button: {
    width: 200,
    height: 40,
    backgroundColor: '#555',
    borderRadius: 3,
    alignItems: 'center',
    marginBottom: 10
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    padding: 5,
    fontFamily: 'Cochin'
  }
});

function mapStateToProps(decks) {
  return { decks };
}

export default connect(mapStateToProps)(NewCard);
