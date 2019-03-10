import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { signIn, signOut } from '../../../models/user/actions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const styles = theme => ({
  navList: {
    flexGrow: 1
  },
  nav: {
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
    fontSize: '16px',
    fontFamily: 'game_of_thronesregular, serif'
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

class NavLinks extends Component {
  render () {
    const { user, classes, signIn, signOut } = this.props
    return (
      <React.Fragment>
        { user ? <div style={{ flexGrow: 1 }}>
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
        </div> : <List classes={{ root: classes.navList }}>
          <Link to={'/'} className={classes.nav}>
            <ListItem button key={'Rules'}>
              <ListItemText classes={{ primary: classes.nav }} primary={'Rules'} />
            </ListItem>
          </Link>
          <ListItem onClick={signIn} button key={'Sign In'} className={classes.nav}>
            <ListItemText classes={{ primary: classes.nav }} primary={'Sign In / Sign Up'} />
          </ListItem>
        </List>
        }
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(connect(null, { signIn, signOut })(NavLinks))
