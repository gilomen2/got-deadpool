import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { addUserToPool, calcPoolResults, createPoolAndAddUser, getPools } from './actions'
import './Pools.scss'
import { selectPools, selectPoolsLoaded } from './reducer'
import { PoolPanel } from './components/PoolPanel'
import { selectGameStatus } from '../../models/game/reducer'

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
    if(nextProps.userPools){
      let copiedPools = {}
      nextProps.userPools.forEach(pool => {
        copiedPools[pool.id] = prevState.copiedPools[pool.id] || false
      })
      return {
        ...prevState,
        copiedPools
      }
    } else if (nextProps.gameLoaded && !prevState.gameLoaded) {
      return {
        ...prevState,
        gameLoaded: nextProps.gameLoaded
      }
    } else {
      return null
    }
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if(this.state.gameLoaded && !prevProps.gameLoaded) {
      this.props.getPools()
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

  handleExpand = pool => (event, expanded) => {
    this.props.calcPoolResults(pool.id)
  }

  render () {
    const {
      user,
      classes,
      userPools,
      addUserToPool,
      createPoolAndAddUser,
      gameStarted
    } = this.props
    const {
      copiedPools
    } = this.state
    return (
      <div>
        {user && !gameStarted &&
          <div className={'pool-admin'}>
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
            </div>
            <div className={'create-pool'}>
              <TextField
                id='create-pool'
                label='Create new pool'
                placeholder='Pool Name'
                className={classes.textField}
                margin='normal'
                onChange={e => {
                  this.setState({
                    poolName: e.target.value
                  })
                }}
              />
              <Button variant="contained" color="secondary" onClick={() => createPoolAndAddUser(this.state.poolName)}>
                Create
              </Button>
            </div>
          </div>}
        {!user && <div>
      Sign in to see pools
        </div>}
        <div>
          {userPools && userPools.map((pool, i) => {
            return(
              <PoolPanel pool={pool} copiedPools={copiedPools} onCopy={this.onCopy} key={`panel-${i}`} handleExpand={this.handleExpand} />
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userPools: selectPools(state),
    gameStarted: selectGameStatus(state),
    poolsLoaded: selectPoolsLoaded(state)
  }
}

export default withStyles(styles)(connect(mapStateToProps, {getPools, addUserToPool, createPoolAndAddUser, calcPoolResults})(Pools))
