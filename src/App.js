import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUser, selectUser } from './models/user/actions'
import TopBar from './components/TopBar'
import { Route } from 'react-router-dom'
import Pools from './routes/pools/Pools'
import './App.scss'

class App extends Component {
  componentWillMount () {
    this.props.fetchUser()
  }

  render () {
    return (
      <div className='App'>
        <TopBar user={this.props.user} />
        <div className='app-container'>
          <Route path='/pools' render={() => <Pools user={this.props.user} />} />
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
