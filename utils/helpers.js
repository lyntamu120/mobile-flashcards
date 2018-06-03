import { AsyncStorage } from 'react-native';

import data from './data';


const DATASAVE_KEY = 'DATASAVE_KEY@12301';


export function getDecks() {
  return AsyncStorage.setItem(DATASAVE_KEY, JSON.stringify(data))
    .then(() => AsyncStorage.getItem(DATASAVE_KEY))
    .catch(e => console.log('Error when fetching all decks: ', e));
}

export function getDeck(id) {
  return AsyncStorage.getItem(DATASAVE_KEY)
    .then(decksStr => {
      const decks = JSON.parse(decksStr);
      return decks[id];
    })
    .catch(e => console.log('Error when obtaining deck: ', e));
}

export function saveDeckTitle(title) {
  const newDeck = {
    [title]: {
      title,
      questions: []
    }
  }
  return AsyncStorage.mergeItem(DATASAVE_KEY, JSON.stringify(newDeck));
}

export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(DATASAVE_KEY)
    .then(res => {
      let data = JSON.parse(res);
      data[title]['questions'].push(card);
      console.log(data);
      return AsyncStorage.setItem(DATASAVE_KEY, JSON.stringify(data));
    });
}
