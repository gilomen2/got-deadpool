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
import classNames from 'classnames'
import ResponsiveDrawer from './Drawer/Drawer'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Media from 'react-media'


const drawerWidth = 240

const styles = theme => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  appBarMobile: {
    width: `100%`,
  },
  toolbarContents: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  toolbarContentsMobile: {
    display: 'flex'
  },
  nav: {
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
    fontSize: '16px',
    fontFamily: 'game_of_thronesregular, serif'
  },
  logoFont: {
    fontFamily: 'game_of_thronesregular, serif'
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  }
})

class TopBar extends Component {
  state = {
    open: false
  }

  toggleDrawer = () => {
    this.setState({
      open: !this.state.open
    })
  }


  render () {
    const { open } = this.state
    const { classes, user } = this.props
    return (
      [
        <Media query={'(max-width: 768px)'} key={'AppBar'}>
          {matches =>
            matches ? (
              <AppBar key={'app-bar'} position='fixed' className={classes.appBarMobile}>
                <Toolbar disableGutters={true} classes={{
                  root: classes.toolbarContentsMobile
                }}>
                  <IconButton
                    color='inherit'
                    aria-label='Open drawer'
                    onClick={this.toggleDrawer}
                    className={classNames(classes.menuButton, open && classes.hide)}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Link to={'/'} className={classes.nav}>
                    <Typography variant='h6' color='inherit' className={classes.logoFont}>
                      Valar Morghulis
                    </Typography>
                  </Link>
                </Toolbar>
              </AppBar>
          ) : (
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
              </AppBar>
          )}
        </Media>,
        <ResponsiveDrawer user={user} open={open} handleClose={this.toggleDrawer} key={'Drawer'} />
      ]
    )
  }
}

export default withStyles(styles)(connect(null, { signIn, signOut })(TopBar))
