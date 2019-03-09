import React, {Component} from 'react'
import { connect } from 'react-redux'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepButton from '@material-ui/core/StepButton'
import { selectUser } from '../../models/user/reducer'
import { selectPools } from '../pools/reducer'
import { selectUserBracket } from '../bracket/reducer'
import { signIn } from '../../models/user/actions'

class Steps extends Component {

  state = {
    activeStep: 0,
    completed: {
      user: false,
      userBracket: false,
      pools: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let newState = {
      ...prevState,
      completed: {
        ...prevState.completed
      }
    }
    if(nextProps.user && !prevState.completed.user) {
      newState.completed = {
        user: true
      }
    }
    if(nextProps.userBracket && !prevState.completed.userBracket) {
      newState.completed = {
        ...newState.completed,
        userBracket: true
      }
    }
    if(nextProps.pools && nextProps.pools.length && !prevState.completed.pools) {
      newState.completed = {
        ...newState.completed,
        pools: true
      }
    }
    if(!nextProps.user) {
      newState.completed = {
        ...newState.completed,
        user: false
      }
    }
    if(!nextProps.userBracket) {
      newState.completed = {
        ...newState.completed,
        userBracket: false
      }
    }
    if(nextProps.pools && !nextProps.pools.length) {
      newState.completed = {
        ...newState.completed,
        pools: false
      }
    }
    return newState
  }

  clickSignUp = () => {
    const { user, signIn } = this.props
    if(!user) {
      signIn()
    }
  }


  render () {
    const {
      history
    } = this.props

    const {
      activeStep
    } = this.state
    return (
      <Stepper nonLinear activeStep={activeStep}>
        <Step key={'Sign Up'}>
          <StepButton onClick={this.clickSignUp} completed={this.state.completed['user']}>
            Sign Up
          </StepButton>
        </Step>
        <Step key={'Join A Pool'}>
          <StepButton onClick={() => history.push('/pools')} completed={this.state.completed['pools']}>
            Join A Pool
          </StepButton>
        </Step>
        <Step key={'Fill Out Bracket'}>
          <StepButton onClick={() => history.push('/bracket')} completed={this.state.completed['userBracket']}>
            Fill Out Bracket
          </StepButton>
        </Step>
      </Stepper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: selectUser(state),
    pools: selectPools(state),
    userBracket: selectUserBracket(state)
  }
}


export default connect(mapStateToProps, {signIn})(Steps)