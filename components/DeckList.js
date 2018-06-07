import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { receiveDecks } from '../actions';
import { getDecks } from '../utils/helpers';
import DeckItem from './DeckItem';

class DeckList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    console.log(this.props);
    getDecks()
    .then(decksStr => {
      let decks = JSON.parse(decksStr);
      return dispatch(receiveDecks(decks));
    })
    .catch(e => console.log('Error in dispatch receiveDecks ', e));
  }
  render() {
    const { decks, navigation } = this.props;
    return (
      <View style={styles.container}>
        {
          Object.keys(decks).map(title => {
            const num = decks[title]['questions'].length;
            return (
              <DeckItem
                title={title}
                numOfCards={num}
                key={title}
                style={styles.box}
                navigate={navigation.navigate}
              />
            );
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  box: {
    marginTop: 5
  }
});
function mapStateToProps(decks) {
  return {
    decks
  }
}
export default connect(mapStateToProps)(DeckList);
