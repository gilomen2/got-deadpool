import React, { Component } from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { ReactComponent as Skull } from '../../../components/Icons/skull.svg'
import Popover from '@material-ui/core/Popover'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import { Face } from '@material-ui/icons'

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
    skull: null,
    whoIsThis: null
  };

  handlePopoverOpen = (event, el) => {
    this.setState({ [el]: event.currentTarget })
  };

  handlePopoverClose = (el) => {
    this.setState({[el]: null})
  };

  render () {
    const { skull, whoIsThis } = this.state;
    const { name, handleChange, value, editable, lastEpisodeAlive, classes, wikiLink } = this.props
    const skullOpen = Boolean(skull);
    const whoIsThisOpen = Boolean(whoIsThis);
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
            ? <div className={'icon'}>
              <Skull aria-owns={skullOpen ? 'skull-popover' : undefined}
                     aria-haspopup="true"
                     onMouseEnter={(e) => this.handlePopoverOpen(e, 'skull')}
                     onMouseLeave={() => this.handlePopoverClose('skull')}
                     onClick={(e) => this.handlePopoverOpen(e, 'skull')}
              />
              <Popover
                id='skull-popover'
                className={classes.popover}
                classes={{
                  paper: classes.paper
                }}
                open={skullOpen}
                anchorEl={skull}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                onClose={() => this.handlePopoverClose('skull')}
                disableRestoreFocus
              >
                Died in episode {lastEpisodeAlive}
              </Popover>
            </div>
            : <div className={'icon'}>
                <a href={wikiLink} target={'_blank'}>
                  <IconButton aria-owns={whoIsThisOpen ? 'whoIsThis-popover' : undefined}
                              aria-haspopup="true"
                              onMouseEnter={(e) => this.handlePopoverOpen(e, 'whoIsThis')}
                              onMouseLeave={() => this.handlePopoverClose('whoIsThis')}
                              onClick={(e) => this.handlePopoverOpen(e, 'whoIsThis')}
                    color="secondary" aria-label="Who is this?">
                    <Face />
                  </IconButton>
                </a>
                <Popover
                  id='whoIsThis-popover'
                  className={classes.popover}
                  classes={{
                    paper: classes.paper
                  }}
                  open={whoIsThisOpen}
                  anchorEl={whoIsThis}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                  }}
                  onClose={() => this.handlePopoverClose('whoIsThis')}
                  disableRestoreFocus
                >
                  Who is this?
                </Popover>
            </div>

        }
      </div>
    )
  }
}

export default withStyles(styles)(Character)
