import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectInitialCharacters, selectUserBracket } from './reducer'
import { getEmptyBracket, getUserBracket, saveUserBracket } from './actions'
import './Bracket.scss'
import { House } from './components/House'
import Button from '@material-ui/core/Button'
import { selectGameStatus } from '../../models/game/reducer'
import isEmpty from 'lodash/isEmpty'

class Bracket extends Component {

  state = {
    characterBracket: {},
    editable: true
  }
  constructor (props) {
    super(props)
    props.getEmptyBracket()
    if(!props.userBracket) {
      props.getUserBracket()
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.gameStarted) {
      return {
        editable: false
      }
    } else if(isEmpty(prevState.characterBracket) && nextProps.userBracket) {
      return {
        characterBracket: nextProps.userBracket,
        editable: false
      }
    } else {
      return prevState
    }
  }

  handleChange = name => event => {
    this.setState({
      characterBracket: {
        ...this.state.characterBracket,
        [name]: event.target.value
      }
    })
  }

  submitForm = (e) => {
    e.preventDefault()
    this.setState({
      editable: false
    }, () => {
      this.props.saveUserBracket(this.state.characterBracket)
      window.ga('send', 'event', 'Bracket', 'save-bracket')
    })

  }

  render () {
    const {
      initialCharacters,
      gameStarted
    } = this.props

    const {
      editable,
      characterBracket
    } = this.state
    return (
      <div className={'bracket-container'}>
        <form onSubmit={(e) => this.submitForm(e)}>
          {initialCharacters && Object.keys(initialCharacters).map(houseName => {
            return <House key={`house-${houseName}`} editable={editable} characterBracket={characterBracket} handleChange={this.handleChange} house={initialCharacters[houseName]} houseName={houseName}/>
          })}
          { !gameStarted && editable &&
            <Button variant="outlined" color="secondary" type={'submit'} disabled={!editable}>
              Save
            </Button>
          }

          {(!editable && !gameStarted) &&
          <Button variant="outlined" color="primary" onClick={() => {
            this.setState({ editable: true })
            window.ga('send', 'event', 'Bracket', 'edit-bracket')
          }}>
            Edit
          </Button>}
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    initialCharacters: selectInitialCharacters(state),
    userBracket: selectUserBracket(state),
    gameStarted: selectGameStatus(state)
  }
}

export default connect(mapStateToProps, { getEmptyBracket, saveUserBracket, getUserBracket })(Bracket)
