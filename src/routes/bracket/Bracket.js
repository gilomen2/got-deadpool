import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectInitialCharacters, selectUserBracket } from './reducer'
import { getEmptyBracket, saveUserBracket } from './actions'
import './Bracket.scss'
import { House } from './components/House'
import Button from '@material-ui/core/Button'
import { selectGameStatus } from '../../models/game/reducer'

class Bracket extends Component {

  state = {
    characterBracket: {},
    editable: true
  }
  constructor (props) {
    super(props)
    props.getEmptyBracket()
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.gameStarted) {
      return {
        editable: false
      }
    } else if(Object.keys(prevState.characterBracket).length === 0 && nextProps.userBracket) {
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
    }, () => this.props.saveUserBracket(this.state.characterBracket))

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
          { !gameStarted &&
            <Button variant="outlined" color="secondary" type={'submit'} disabled={!editable}>
              Save
            </Button>
          }

          {(!editable && !gameStarted) &&
          <Button variant="outlined" className={'edit-button'} color="primary" onClick={() => this.setState({ editable: true })}>
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

export default connect(mapStateToProps, { getEmptyBracket, saveUserBracket })(Bracket)
