import React, { Component } from 'react'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { signIn, signOut } from '../models/user/actions'
import { Link } from 'react-router-dom'

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

class TopBar extends Component {
  render () {
    const { classes, signIn, signOut, user } = this.props
    return (
      <div>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' color='inherit' className={classes.grow}>
                Valar Morghulis
            </Typography>
            {user && (
              <div>
                <Link to={'/pools'}><Button color='inherit'>Pools</Button></Link>
                <Button color='inherit' onClick={signOut}>Log Out</Button>
              </div>
            )}
            {!user && <Button color='inherit' onClick={signIn}>Login</Button>}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(connect(null, { signIn, signOut })(TopBar))
