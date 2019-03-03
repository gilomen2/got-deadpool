import React, { Component } from 'react'
import Modal from '@material-ui/core/Modal'

export class Errors extends Component {
  render () {
    const {
      showModal,
      handleClose,
      errorMessage
    } = this.props
    return (
      <Modal open={showModal} onClose={handleClose}>
        <div>{errorMessage}</div>
      </Modal>
    )
  }
}
