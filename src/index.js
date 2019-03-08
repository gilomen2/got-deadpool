import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter, Route } from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core'
import { Provider } from 'react-redux'
import configureStore, { initialState } from './store'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Alegreya Sans',
      'sans-serif'
    ].join(','),
    fontSize: 16
  },
  palette: {
    primary: {
      light: '#4e4c4f',
      main: '#262427',
      dark: '#000000',
      contrastText: '#fff'
    },
    secondary: {
      light: '#839eb7',
      main: '#557087',
      dark: '#29455a',
      contrastText: '#000'
    }
  }
})

ReactDOM.render(
  <BrowserRouter>
    <Provider store={configureStore(initialState)}>
      <MuiThemeProvider theme={theme}>
        <Route component={App} />
      </MuiThemeProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
