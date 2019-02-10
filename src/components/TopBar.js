import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import { Link, Route } from 'react-router-dom'
import { Login } from '../routes/login'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import PermIdentity from '@material-ui/icons/PermIdentity'

export class TopBar extends Component {
  render () {
    return (
      <div>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' color='inherit'>
                Valar Morghulis
            </Typography>
            <Link to='/login'>
              <IconButton color={'secondary'} aria-label='Login'>
                <PermIdentity />
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
        <div className={'container'}>
          <Route path='/login' component={Login} />
        </div>
      </div>
    )
  }
}
