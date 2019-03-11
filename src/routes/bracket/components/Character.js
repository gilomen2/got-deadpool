import React, { Component } from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { ReactComponent as Skull } from '../../../components/Icons/skull.svg'
import Popover from '@material-ui/core/Popover'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: '5px'
  }
});

class Character extends Component {

  state = {
    anchorEl: null,
  };

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };

  render () {
    const { anchorEl } = this.state;
    const { name, handleChange, value, editable, lastEpisodeAlive, classes } = this.props
    const open = Boolean(anchorEl);
    return (
      <div className={'character-wrapper'}>
        <FormControl fullWidth required>
          <InputLabel htmlFor={`${name}`}>{name}</InputLabel>
          <Select
            native
            value={value}
            onChange={handleChange(`${name}`)}
            name={`${name}`}
            inputProps={{
              id: `${name}`
            }}
            disabled={!editable}
          >
            <option value='' />
            <option value={1}>Episode 1</option>
            <option value={2}>Episode 2</option>
            <option value={3}>Episode 3</option>
            <option value={4}>Episode 4</option>
            <option value={5}>Episode 5</option>
            <option value={6}>Episode 6</option>
            <option value={0}>Survivor</option>
          </Select>
        </FormControl>
        {
          lastEpisodeAlive && lastEpisodeAlive > 0
            ? <div className={'skull-icon'}>
              <Skull aria-owns={open ? 'mouse-over-popover' : undefined}
                     aria-haspopup="true"
                     onMouseEnter={this.handlePopoverOpen}
                     onMouseLeave={this.handlePopoverClose}
                     onClick={this.handlePopoverOpen}
              />
              <Popover
                id='mouse-over-popover'
                className={classes.popover}
                classes={{
                  paper: classes.paper
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                onClose={this.handlePopoverClose}
                disableRestoreFocus
              >
                Died in episode {lastEpisodeAlive}
              </Popover>
            </div>
            : <div className={'skull-icon'} />
        }
      </div>
    )
  }
}

export default withStyles(styles)(Character)
