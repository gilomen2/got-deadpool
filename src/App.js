import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUser } from './models/user/actions'
import TopBar from './components/TopBar/TopBar'
import Pools from './routes/pools/Pools'
import CssBaseline from '@material-ui/core/CssBaseline'
import './App.scss'
import Bracket from './routes/bracket/Bracket'
import { PrivateRoute } from './components/PrivateRoute'
import { selectUser } from './models/user/reducer'
import { Storage, storageKey } from './utils/storage'
import {Route} from 'react-router-dom'
import Home from './routes/home/Home'
import { getGame } from './models/game/actions'
import { selectGameLoaded } from './models/game/reducer'
import { Loader } from './components/Loader/Loader'
import { selectPoolsError, selectPoolsLoading } from './routes/pools/reducer'
import { selectBracketError, selectBracketLoading } from './routes/bracket/reducer'
import Errors, { clearErrors } from './components/Error'
import { getUserBracket } from './routes/bracket/actions'
import { getPools } from './routes/pools/actions'

class App extends Component {
  state = {
    storageUser: undefined
  }

  componentDidMount () {
    const {
      fetchUser,
      getGame,
      user,
      getPools,
      getUserBracket
    } = this.props
    fetchUser()
    getGame()
    if (user) {
      getPools()
      getUserBracket()
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(!nextProps.user && prevState.storageUser) {
      return {storageUser: undefined}
    } else if(!nextProps.user) {
      return {storageUser: Storage.getItem(storageKey)}
    } else {
      return null
    }
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const {
      user,
      getPools,
      getUserBracket
    } = this.props
    if(user && !prevProps.user) {
      getPools()
      getUserBracket()
    }
  }

  render () {
    const { user, location, gameLoaded, isLoading, error, clearErrors } = this.props
    const { storageUser } = this.state
    return (
      <div className='App'>
        <CssBaseline />
        <TopBar user={user} />
        <div className='viewport-container'>
          <Loader isLoading={isLoading} />
          <Errors error={error} handleClose={clearErrors} />
          <div className='toolbar' />
          <div className='app-container'>
            <div className='content-container'>
            <Route exact path='/' render={()=> <Home user={user} gameLoaded={gameLoaded} />} />
              <PrivateRoute exact path='/pools' user={storageUser || user} location={location} render={() => <Pools location={location} user={user} gameLoaded={gameLoaded} />} />
              <PrivateRoute exact path='/bracket' user={storageUser || user} location={location} render={() => <Bracket location={location} user={user} gameLoaded={gameLoaded} />} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: selectUser(state),
    gameLoaded: selectGameLoaded(state),
    isLoading: selectPoolsLoading(state) || selectBracketLoading(state),
    error: selectPoolsError(state) || selectBracketError(state)
  }
}

export default (connect(mapStateToProps, { fetchUser, getGame, clearErrors, getUserBracket, getPools })(App))
