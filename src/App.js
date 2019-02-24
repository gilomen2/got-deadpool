import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUser } from './models/user/actions'
import TopBar from './components/TopBar'
import Pools from './routes/pools/Pools'
import './App.scss'
import { selectUser } from './models/user/reducer'
import Bracket from './routes/bracket/Bracket'
import { PrivateRoute } from './components/PrivateRoute'

class App extends Component {
  componentWillMount () {
    this.props.fetchUser()
  }

  render () {
    const { user, location } = this.props
    return (
      <div className='App'>
        <TopBar user={this.props.user} />
        <div className='app-container'>
          <PrivateRoute path='/pools' user={user} location={location} render={() => <Pools location={location} user={user} />} />
          <PrivateRoute path='/bracket' user={user} location={location} render={() => <Bracket location={location} user={user} />} />
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
