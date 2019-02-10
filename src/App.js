import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUser, selectUser } from './models/user/actions'
import { TopBar } from './components/TopBar'

class App extends Component {
  componentWillMount () {
    this.props.fetchUser()
  }

  render () {
    return (
      <div className='App'>
        <TopBar />
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
