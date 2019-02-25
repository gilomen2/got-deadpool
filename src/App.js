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

class App extends Component {
  state = {
    storageUser: undefined
  }

  constructor (props) {
    super(props)
  }

  componentWillMount () {
    this.setState({
      storageUser: Storage.getItem(storageKey)
    })
    this.props.fetchUser()
  }

  render () {
    const { user, location } = this.props
    const { storageUser } = this.state
    return (
      <div className='App'>
        <TopBar user={this.props.user} />
        <div className='app-container'>
          <PrivateRoute path='/pools' user={storageUser || user} location={location} render={() => <Pools location={location} user={user} />} />
          <PrivateRoute path='/bracket' user={storageUser || user} location={location} render={() => <Bracket location={location} user={user} />} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: selectUser(state)
  }
}

export default (connect(mapStateToProps, { fetchUser })(App))
