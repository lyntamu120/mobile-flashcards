import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { removeLocalNotification, setLocalNotification } from '../utils/helpers';


class Deck extends Component {
  onStartQuiz = () => {
    const { title } = this.props.navigation.state.params;
    removeLocalNotification().then(setLocalNotification);
    this.props.navigation.navigate('Quiz', { title });
  }
  render() {
    const { decks } = this.props;
    const { title } = this.props.navigation.state.params;
    const numOfCards = decks[title]['questions'].length;
    return (
      <View style={styles.container}>
        <Text style={[styles.text, {color: 'green'}]}>{ title }</Text>
        <Text style={styles.text}>{ numOfCards } cards</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('NewCard', { title })}
        >
          <Text style={{ fontSize: 24 }}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this.onStartQuiz}
        >
          <Text style={{ fontSize: 24 }}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(decks) {
  return { decks };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Cochin',
    height: 50
  },
  button: {
    backgroundColor: '#888',
    padding: 8,
    alignItems: 'center',
    width: 180,
    height: 50,
    marginTop: 30
  },
});

export default connect(mapStateToProps)(Deck);
