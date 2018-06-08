import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';

import data from './data';


const DATASAVE_KEY = 'DATASAVE_KEY@12301';
const NOTIFICATION_KEY = 'NOTIFICATION_8888';


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

function reateNotification() {
  return {
    title: 'Please Study Today',
    body: " 👋Don't forget to study hard today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function removeLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHour(20);
              tomorrow.setMinutes(0);

              Notifications.scheduleLocalNotificationAsync(
                reateNotification(),
                {
                  time: tomorrow,
                  repeat: 'day'
                }
              );

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          });
      }
    });
}
