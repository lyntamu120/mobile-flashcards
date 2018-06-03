import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { FontAwesome, Entypo } from 'react-native-vector-icons';

import Deck from './components/Deck';
import DeckList from './components/DeckList';
import NewCard from './components/NewCard';
import NewDeck from './components/NewDeck';
import Quiz from './components/Quiz';
import{ getDecks, getDeck, saveDeckTitle, addCardToDeck } from './utils/helpers';

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: DeckList,
  },
  NewDeck: {
    screen: NewDeck
  },
}, {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      if (routeName === 'Decks') {
        return <FontAwesome name='home' size={30} color={tintColor} />
      }
      else if (routeName === 'NewDeck') {
        return  <Entypo name='add-to-list' size={30} color={tintColor} />
      }
    }
  }),
  tabBarOptions: {
    activeTiniColor: 'tomato',
    inactiveTintColor: 'gray'
  }
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
  componentDidMount() {
    getDecks()
      .then(addCardToDeck('React', {
        question: 'What is gg?',
        answer: 'Good Game'
      }))
  }
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
