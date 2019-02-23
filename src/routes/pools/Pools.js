import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { addUserToPool, getPools} from './actions'
import './Pools.scss'
import { selectPools } from './reducer'
import { PoolPanel } from './components/PoolPanel'

const styles = {
  textField: {
    width: 200
  }
}

class Pools extends Component {
  state = {
    copiedPools: {}
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(!prevState.user && nextProps.user) {
      nextProps.getPools()
      return {user: nextProps.user}
    } else if(nextProps.userPools){
      let copiedPools = {}
      nextProps.userPools.forEach(pool => {
        copiedPools[pool.id] = prevState.copiedPools[pool.id] || false
      })
      return {
        copiedPools
      }
    } else {
      return null
    }
  }

  onCopy = (poolId) => {
    this.setState({
      copiedPools: {
        [poolId]: true
      }
    }, () => {
      setTimeout(() => {
        this.setState({
          copiedPools: {
            [poolId]: false
          }
        })
      }, 1500)
    })
  }

  render () {
    const {
      user,
      classes,
      userPools,
      addUserToPool
    } = this.props
    const {
      copiedPools
    } = this.state
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
          <Button variant="contained" color="secondary" onClick={() => addUserToPool(this.state.poolId)}>
            Join
          </Button>
        </div>}
        {!user && <div>
      Sign in to see pools
        </div>}
        <div>
          {userPools && userPools.map((pool, i) => {
            return(
              <PoolPanel pool={pool} index={i} copiedPools={copiedPools} onCopy={this.onCopy}/>
            )
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

export default withStyles(styles)(connect(mapStateToProps, {getPools, addUserToPool})(Pools))
