import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

class Quiz extends Component {
  state = {
    questionFace: true,
    qIndex: 0,
    correctNum: 0,
    wrongNum: 0
  }
  render() {
    const { title } = this.props.navigation.state.params;
    const { questionFace, qIndex, correctNum, wrongNum } = this.state;
    const { questions } = this.props.decks[title];
    const currentQuestion = questions[qIndex];

    if (qIndex + 1 > questions.length) {
      return (
        <View style={styles.container}>
          <Text style={[styles.text, {'color': 'green'}]}>Correct Answers: {correctNum}</Text>
          <Text style={[styles.text, {'color': 'red'}]}>Wrong Answers: {wrongNum}</Text>
        </View>
      );
    }

    return (
      <View>
        <Text style={styles.pageIndex}>{qIndex + 1}/{questions.length}</Text>
        <Text style={[styles.text, {fontSize: questionFace ? 40 : 20}]}>
          {questionFace ? currentQuestion.question : currentQuestion.answer }
        </Text>
        <TouchableOpacity
          onPress={() => this.setState((preState) => ({
            questionFace: !preState.questionFace
          }))}
        >
          <Text style={[styles.text, {'color': questionFace ? 'red' : 'green'}]}>
            {questionFace ? 'Answer' : 'Question'}
          </Text>
        </TouchableOpacity>

        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState((prevState) => ({
              correctNum: prevState.correctNum + 1,
              qIndex: prevState.qIndex + 1
            }))}
          >
            <Text style={{fontSize: 24}}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            // onPress={() => this.setState((prevState) => ({
            //   wrongNum: prevState.wrongNum + 1,
            //   qIndex: prevState.qIndex + 1
            // }))}
          >
            <Text style={{fontSize: 24}}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(decks) {
  return { decks };
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Cochin'
  },
  button: {
    backgroundColor: '#888',
    padding: 8,
    alignItems: 'center',
    width: 180,
    height: 50,
    marginTop: 30
  },
  pageIndex: {
    fontSize: 20,
    fontFamily: 'Al Nile',
    marginBottom: 100,
  },
  buttonSection: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default connect(mapStateToProps)(Quiz);
