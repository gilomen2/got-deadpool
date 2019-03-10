import React, { Component } from 'react'
import Media from 'react-media'
import Dragonglass from '../../../images/dragonglass-small.jpg'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import NavLinks from './NavLinks'

const drawerWidth = 240

const styles = theme => ({
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
  }
})

class ResponsiveDrawer extends Component {
  render () {
    const { classes, user } = this.props

    return (
      <Media query={'(max-width: 768px)'}>
        {matches =>
          matches ? (
            <p />
          ) : (
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
              <NavLinks user={user} />
              <div className={'drawer-bottom'}>
                <p className={'disclaimer'}>This site is not owned by, affiliated with, or operated by HBO. Game of Thrones and its characters are a copyright of HBO. This is just for funsies. I am making no money off of it.</p>
                <a href={'https://bethgilomen.com'} target={'_blank'}>who made this?</a>
              </div>
            </Drawer>
          )}
      </Media>
    )
  }
}

export default withStyles(styles)(ResponsiveDrawer)
