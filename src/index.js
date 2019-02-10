import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import firebase from 'firebase/app'
import { BrowserRouter } from 'react-router-dom'

const config = {
  apiKey: 'AIzaSyA4pjCXig4Y1pe8cLg5V3bTObcb95ECLV8',
  authDomain: 'got-deadpool-3a31b.firebaseapp.com',
  databaseURL: 'https://got-deadpool-3a31b.firebaseio.com',
  projectId: 'got-deadpool-3a31b',
  storageBucket: 'got-deadpool-3a31b.appspot.com',
  messagingSenderId: '968181496049'
}

firebase.initializeApp(config)

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
