import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { addUserToPool, createPoolAndAddUser, getPools } from './actions'
import './Pools.scss'
import { selectPools } from './reducer'
import PoolPanel from './components/PoolPanel'
import { selectGameStatus } from '../../models/game/reducer'
import { withMedia } from '../../utils/withMediaQuery'
import { queries } from '../../styles/mediaQueries'

const styles = theme => ({
  textField: {
    width: 200
  },
  buttonColor: {
    color: theme.palette.primary.contrastText
  }
})

class Pools extends Component {
  state = {
    copiedPools: {},
    gameLoaded: false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.userPools && nextProps.userPools.length){
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

  componentDidMount() {
    if(this.state.gameLoaded) {
      this.props.getPools()
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

  render () {
    const {
      user,
      classes,
      userPools,
      addUserToPool,
      createPoolAndAddUser,
      gameStarted,
      media
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
              <Button variant="contained" color="secondary" classes={{label: classes.buttonColor}} onClick={() => addUserToPool(this.state.poolId)}>
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
              <Button variant="contained" color="secondary" classes={{label: classes.buttonColor}} onClick={() => createPoolAndAddUser(this.state.poolName)}>
                Create
              </Button>
            </div>
          </div>}
        <div>
          {userPools && userPools.map((pool, i) => {
            return(
              <PoolPanel media={media} pool={pool} copiedPools={copiedPools} onCopy={this.onCopy} key={`panel-${i}`} gameStarted={gameStarted} />
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
    gameStarted: selectGameStatus(state)
  }
}

export default withStyles(styles)(connect(mapStateToProps, {getPools, addUserToPool, createPoolAndAddUser})(Pools))
