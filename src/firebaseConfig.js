import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyA4pjCXig4Y1pe8cLg5V3bTObcb95ECLV8',
  authDomain: 'got-deadpool-3a31b.firebaseapp.com',
  databaseURL: 'https://got-deadpool-3a31b.firebaseio.com',
  projectId: 'got-deadpool-3a31b',
  storageBucket: 'got-deadpool-3a31b.appspot.com',
  messagingSenderId: '968181496049'
}

firebase.initializeApp(config)

export const authRef = firebase.auth()
