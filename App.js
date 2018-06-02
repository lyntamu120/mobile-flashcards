import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Deck from './components/Deck';
import DeckList from './components/DeckList';
import NewCard from './components/NewCard';
import NewDeck from './components/NewDeck';
import Quiz from './components/Quiz';

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: DeckList,
  },
  NewDeck: {
    screen: NewDeck
  },

});

const RootStack = createStackNavigator({
  Tabs: {
    screen: Tabs
  },
  Quiz: {
    screen: Quiz
  },
  Deck: {
    screen: Deck
  },
  NewCard: {
    screen: NewCard
  }
});

export default class App extends React.Component {
  render() {
    return (
      <RootStack />
    );
  }
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
