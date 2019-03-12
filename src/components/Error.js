import React, { Component } from 'react'
import Modal from '@material-ui/core/Modal'
import { withStyles } from '@material-ui/core/styles'

export const CLEAR_ERRORS = 'CLEAR_ERRORS'

export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  })
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none'
  }
})

function rand () {
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle () {
  const top = 50 + rand()
  const left = 50 + rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

class Errors extends Component {
  render () {
    const {
      error,
      classes,
      handleClose
    } = this.props
    return (
      <Modal open={typeof error === 'string'} onClose={handleClose}>
        <div style={getModalStyle()} className={classes.paper}>
          {error}
        </div>
      </Modal>
    )
  }
}
const ErrorModalWrapped = withStyles(styles)(Errors)

export default ErrorModalWrapped
