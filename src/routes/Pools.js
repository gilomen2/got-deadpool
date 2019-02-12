import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'

const styles = {
  textField: {
    width: 200
  }
}

class Pools extends Component {
  state = {
    poolId: null
  }

  render () {
    const {
      user,
      classes
    } = this.props
    return (
      <div>
        {user && <div>
          <TextField
            id='join-pool'
            label='Enter a pool id to join'
            placeholder='Pool Id'
            className={classes.textField}
            margin='normal'
            onChange={e => {
              this.setState({
                poolId: e.target.value
              })
            }}
          />
        </div>}
        {!user && <div>
      Sign in to see pools
        </div>}
      </div>
    )
  }
}

export default withStyles(styles)(connect(null, {})(Pools))