import React, { Component } from 'react'
import { connect } from 'react-redux'
import Steps from './Steps'
import { selectGameStatus } from '../../models/game/reducer'
import Button from '@material-ui/core/Button'
import './Home.scss'
import { Link } from 'react-router-dom'
import { signIn } from '../../models/user/actions'

class Home extends Component {
  render () {
    const {
      media,
      user,
      history,
      gameLoaded,
      gameStarted,
      signIn
    } = this.props
    return (
      <div className={'home'}>
        {gameLoaded && !gameStarted &&
        <React.Fragment>
          <Steps media={media} history={history} />
          <div className={'home-content'}>
            <img className={'raven'} src={'https://d3hlw4rqvr3ro4.cloudfront.net/three-eyed-raven.png'} alt={'three eyed raven with text "winter is coming"'} />
            <div className={'buttons'}>
              <Link to={'/rules'}>
                <Button size='large' variant='contained' color='primary'>
                Read the Rules
                </Button>
              </Link>
              {user
                ? <Link to={'/pools'}>
                  <Button size='large' variant='outlined' color='secondary'>
                      Join a Pool
                  </Button>
                </Link>
                : <Button onClick={signIn} size='large' variant='outlined' color='secondary'>
                  Sign Up
                </Button>
              }
            </div>
          </div>
        </React.Fragment>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    game: selectGameStatus(state),
    gameStarted: selectGameStatus(state)
  }
}

export default connect(mapStateToProps, { signIn })(Home)
