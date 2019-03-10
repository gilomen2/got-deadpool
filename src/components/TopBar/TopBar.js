import React, { Component } from 'react'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { signIn, signOut } from '../../models/user/actions'
import { Link } from 'react-router-dom'
import { CountdownTimer } from '../Countdown/Countdown'
import './TopBar.scss'
import ResponsiveDrawer from './Drawer/Drawer'

const drawerWidth = 240

const styles = theme => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  toolbarContents: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  nav: {
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
    fontSize: '16px',
    fontFamily: 'game_of_thronesregular, serif'
  },
  logoFont: {
    fontFamily: 'game_of_thronesregular, serif'
  }
})

class TopBar extends Component {
  render () {
    const { classes, user } = this.props
    return (
      [
        <AppBar key={'app-bar'} position='fixed' className={classes.appBar}>
          <Toolbar classes={{
            root: classes.toolbarContents
          }}>
            <Link to={'/'} className={classes.nav}>
              <Typography variant='h6' color='inherit' className={classes.logoFont}>
                  Valar Morghulis
              </Typography>
            </Link>
            <CountdownTimer />
          </Toolbar>
        </AppBar>,
        <ResponsiveDrawer user={user} />
      ]
    )
  }
}

export default withStyles(styles)(connect(null, { signIn, signOut })(TopBar))
