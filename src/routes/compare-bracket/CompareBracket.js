import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCompareUserBracket } from './actions'
import { selectCompareBracket } from './reducer'
import { selectGameStatus } from '../../models/game/reducer'
import { selectUserBracket } from '../bracket/reducer'
import './CompareBracket.scss'
import { getUserBracket } from '../bracket/actions'
import { nightKingFix } from '../../utils/nightKingFix'
import Character from '../bracket/components/Character'

class CompareBracket extends Component {
  state = {
    gameLoaded: false,
    gameStarted: false,
    fetched: false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.gameLoaded && !prevState.gameLoaded) {
      if (nextProps.gameStarted && !prevState.gameStarted) {
        return {
          gameStarted: true,
          gameLoaded: true
        }
      } else {
        return null
      }
    } else {
      return null
    }
  }

  componentDidMount () {
    const {
      getCompareUserBracket,
      getUserBracket,
      match: {
        params: {
          compareId
        }
      },
      user
    } = this.props

    const {
      gameLoaded,
      gameStarted,
      fetched
    } = this.state

    if (user && (gameLoaded && gameStarted) && !fetched) {
      getCompareUserBracket(compareId)
      getUserBracket()
      this.setState({
        fetched: true
      })
    }
  }

  componentDidUpdate() {
    const {
      getCompareUserBracket,
      getUserBracket,
      match: {
        params: {
          compareId
        }
      },
      user
    } = this.props

    const {
      gameLoaded,
      gameStarted,
      fetched
    } = this.state

    if (user && (gameLoaded && gameStarted) && !fetched) {
      getCompareUserBracket(compareId)
      getUserBracket()
      this.setState({
        fetched: true
      })
    }
  }

  render () {
    const {
      user,
      userBracket,
      compareBracket,
      gameStarted,
      gameLoaded,
      match: {
        params: {
          compareId
        }
      }
    } = this.props

    return (
      <div>
        {(!user || (gameLoaded && !gameStarted)) && <Redirect to={'/'} />}
        {(compareBracket && userBracket) &&
          <div className={'compare-bracket'}>
            <div className={'your-bracket'}>
              <h2>Your Bracket</h2>
              {Object.keys(userBracket).map(character => {
                return (
                  <div className={'character'} key={`${character}-${user.uid}-wrap`}>
                    <Character key={`${character}-${user.uid}`} lastEpisodeAlive={character.lastEpisodeAlive} editable={false} name={nightKingFix(character)} wikiLink={character.wikiLink} handleChange={()=>{}} value={userBracket[`${character}`] ? userBracket[`${character}`] : ''} showIcon={false} />
                  </div>
                )
              })}
            </div>
            <div className={'their-bracket'}>
              <h2>Their Bracket</h2>
              {Object.keys(compareBracket).map(character => {
                return (
                  <div className={'character'} key={`${character}-${compareId}-wrap`}>
                    <Character key={`${character}-${compareId}`} lastEpisodeAlive={character.lastEpisodeAlive} editable={false} name={nightKingFix(character)} wikiLink={character.wikiLink} handleChange={()=>{}} value={compareBracket[`${character}`] ? compareBracket[`${character}`] : ''} showIcon={false} />
                  </div>
                )
              })}
            </div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, {
  match: {
    params: {
      compareId
    }
  }
}) => {
  return {
    compareBracket: selectCompareBracket(state, compareId),
    gameStarted: selectGameStatus(state),
    userBracket: selectUserBracket(state)
  }
}

export default connect(mapStateToProps, { getCompareUserBracket, getUserBracket })(CompareBracket)
