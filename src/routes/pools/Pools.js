import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { getPools, selectPools } from './actions'

const styles = {
  textField: {
    width: 200
  }
}

class Pools extends Component {
  state = {
    poolId: null
  }
  componentWillReceiveProps (nextProps) {
    if(nextProps.user) {
      this.props.getPools()
    }
  }

  render () {
    const {
      user,
      classes,
      userPools
    } = this.props
    return (
      <div>
        {user &&
        <div className={'join-pool'}>
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
          <Button variant="contained" color="secondary">
            Secondary
          </Button>
        </div>}
        {!user && <div>
      Sign in to see pools
        </div>}
        <div>
          {userPools && userPools.map(pool => {
            debugger
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userPools: selectPools(state)
  }
}

export default withStyles(styles)(connect(mapStateToProps, {getPools})(Pools))
