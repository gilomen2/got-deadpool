import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUser } from './models/user/actions'
import TopBar from './components/TopBar'
import Pools from './routes/pools/Pools'
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
import { selectPoolsLoading } from './routes/pools/reducer'
import { selectBracketLoading } from './routes/bracket/reducer'

class App extends Component {
  state = {
    storageUser: undefined
  }

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const {
      fetchUser,
      getGame
    } = this.props
    fetchUser()
    getGame()
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(!nextProps.user && prevState.storageUser) {
      return {storageUser: undefined}
    } else if(!nextProps.user) {
      return {storageUser: Storage.getItem(storageKey)}
    } else {
      return prevState
    }
  }

  render () {
    const { user, location, gameLoaded, isLoading } = this.props
    const { storageUser } = this.state
    return (
      <div className='App'>
        <TopBar user={this.props.user} />
        <div className='viewport-container'>
          <Loader isLoading={isLoading}/>
          <div className='app-container'>
            <Route exact path='/' component={Home} />
            <PrivateRoute exact path='/pools' user={storageUser || user} location={location} render={() => <Pools location={location} user={user} gameLoaded={gameLoaded} />} />
            <PrivateRoute exact path='/bracket' user={storageUser || user} location={location} render={() => <Bracket location={location} user={user} gameLoaded={gameLoaded} />} />
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
    isLoading: selectPoolsLoading(state) || selectBracketLoading(state)
  }
}

export default (connect(mapStateToProps, { fetchUser, getGame })(App))
