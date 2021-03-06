import React, { Component } from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { withStyles } from '@material-ui/core'

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
const drawerWidth = 240

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    background: `linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(127,126,128,0.39) 59%,rgba(84,82,85,0.46) 79%,rgba(38,36,39,1)), url('https://d3hlw4rqvr3ro4.cloudfront.net/dragonglass-small2.jpg') center`,
    backgroundSize: 'cover',
    overflow: 'hidden',
    height: '100vh'
  },
  noBorder: {
    border: 'none',
    display: 'flex',
    flexDirection: 'column'
  }
})

class SwipeableDrawerWrapper extends Component {
  render () {
    const { classes, open, handleClose, children } = this.props
    return (
      <SwipeableDrawer
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
          paperAnchorDockedLeft: classes.noBorder
        }}
        onOpen={() => {}}
        open={open}
        onClose={handleClose}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}>
        {children}
      </SwipeableDrawer>
    )
  }
}

export default withStyles(styles)(SwipeableDrawerWrapper)
