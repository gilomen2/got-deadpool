import React, { Component } from 'react'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'
import { signIn, signOut } from '../../models/user/actions'
import { Link } from 'react-router-dom'
import Dragonglass from '../../images/dragonglass.jpg'
import { CountdownTimer } from '../Countdown/Countdown'
import './TopBar.scss'

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    background: `linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(127,126,128,0.39) 59%,rgba(84,82,85,0.46) 79%,rgba(38,36,39,1)), url(${Dragonglass}) center`,
    backgroundSize: 'cover',
    overflow: 'hidden'
  },
  noBorder: {
    border: 'none',
    display: 'flex',
    flexDirection: 'column'
  },
  toolbar: {
    minHeight: '64px'
  },
  toolbarContents: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  logoFont: {
    fontFamily: 'game_of_thronesregular, serif'
  },
  nav: {
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
    fontSize: '16px',
    fontFamily: 'game_of_thronesregular, serif'
  },
  navList: {
    flexGrow: 1
  },
  profileImage: {
    height: 105,
    width: 100,
    position: 'relative',
    zIndex: '1',
    margin: '0 auto',
    '-webkit-clip-path': 'polygon(51% 1%, 47% 4%, 43% 7%, 38% 9%, 34% 11%, 28% 12%, 23% 11%, 19% 11%, 14% 10%, 9% 8%, 8% 14%, 8% 20%, 8% 26%, 8% 32%, 8% 39%, 9% 45%, 10% 50%, 12% 56%, 14% 62%, 16% 68%, 20% 73%, 24% 79%, 28% 84%, 32% 88%, 37% 92%, 41% 95%, 46% 97%, 50% 99%, 55% 97%, 59% 95%, 64% 92%, 68% 88%, 73% 85%, 76% 82%, 79% 77%, 83% 72%, 86% 68%, 88% 62%, 90% 57%, 91% 51%, 92% 46%, 92% 41%, 93% 36%, 93% 31%, 93% 27%, 93% 22%, 93% 18%, 93% 14%, 92% 8%, 87% 10%, 82% 11%, 77% 12%, 72% 12%, 67% 11%, 63% 9%, 59% 7%, 56% 4%)',
    clipPath: `polygon(51% 1%, 47% 4%, 43% 7%, 38% 9%, 34% 11%, 28% 12%, 23% 11%, 19% 11%, 14% 10%, 9% 8%, 8% 14%, 8% 20%, 8% 26%, 8% 32%, 8% 39%, 9% 45%, 10% 50%, 12% 56%, 14% 62%, 16% 68%, 20% 73%, 24% 79%, 28% 84%, 32% 88%, 37% 92%, 41% 95%, 46% 97%, 50% 99%, 55% 97%, 59% 95%, 64% 92%, 68% 88%, 73% 85%, 76% 82%, 79% 77%, 83% 72%, 86% 68%, 88% 62%, 90% 57%, 91% 51%, 92% 46%, 92% 41%, 93% 36%, 93% 31%, 93% 27%, 93% 22%, 93% 18%, 93% 14%, 92% 8%, 87% 10%, 82% 11%, 77% 12%, 72% 12%, 67% 11%, 63% 9%, 59% 7%, 56% 4%)`
  }
})

class TopBar extends Component {
  render () {
    const { classes, signIn, signOut, user } = this.props
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
        <Drawer key={'drawer'}
          className={classes.drawer}
          variant='permanent'
          classes={{
            paper: classes.drawerPaper,
            paperAnchorDockedLeft: classes.noBorder
          }}
          anchor='left'
        >
          <div className={classes.toolbar} />
          {user && (
            <div style={{ flexGrow: 1 }}>
              <div style={{ filter: 'drop-shadow(#fff 0px 0px 2px)' }}>
                <div style={{
                  background: `url(${user.photoURL}) center no-repeat`,
                  backgroundSize: 'cover'
                }} className={classes.profileImage} />
              </div>
              <List classes={{ root: classes.navList }}>
                <Link to={'/'} className={classes.nav}>
                  <ListItem button key={'Rules'}>
                    <ListItemText classes={{ primary: classes.nav }} primary={'Rules'}>Rules</ListItemText>
                  </ListItem>
                </Link>
                <Link to={'/bracket'} className={classes.nav}>
                  <ListItem button key={'Your Bracket'}>
                    <ListItemText classes={{ primary: classes.nav }} primary={'Your Bracket'} />
                  </ListItem>
                </Link>
                <Link to={'/pools'} className={classes.nav}>
                  <ListItem button key={'Pools'}>
                    <ListItemText classes={{ primary: classes.nav }} primary={'Pools'} />
                  </ListItem>
                </Link>
                <ListItem onClick={signOut} button key={'Log Out'} className={classes.nav}>
                  <ListItemText classes={{ primary: classes.nav }} primary={'Log Out'} />
                </ListItem>
              </List>
            </div>
          )}
          {!user &&
            <List classes={{ root: classes.navList }}>
              <Link to={'/'} className={classes.nav}>
                <ListItem button key={'Rules'}>
                  <ListItemText classes={{ primary: classes.nav }} primary={'Rules'} />
                </ListItem>
              </Link>
              <ListItem onClick={signIn} button key={'Sign In'} className={classes.nav}>
                <ListItemText classes={{ primary: classes.nav }} primary={'Sign In / Sign Up'} />
              </ListItem>
            </List>}
          <div className={'drawer-bottom'}>
            <p className={'disclaimer'}>This site is not owned by, affiliated with, or operated by HBO. Game of Thrones and its characters are a copyright of HBO. This is just for funsies. I am making no money off of it.</p>
            <a href={'https://bethgilomen.com'} target={'_blank'}>who made this?</a>
          </div>
        </Drawer>
      ]
    )
  }
}

export default withStyles(styles)(connect(null, { signIn, signOut })(TopBar))
