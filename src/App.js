import React, { Component } from 'react'
import './App.css'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { Link, Route } from 'react-router-dom'
import { Login } from './routes/login'

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

class App extends Component {
  render () {
    const { classes } = this.props
    return (
      <div className='App'>
        <div className={classes.root}>
          <AppBar position='static'>
            <Toolbar>
              <Typography variant='h6' color='inherit' className={classes.grow}>
                News
              </Typography>
              <Link to='/login'>
                <Button color='inherit'>Login</Button>
              </Link>
            </Toolbar>
          </AppBar>
          <div className={'container'}>
            <Route path='/login' component={Login} />
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(App)
