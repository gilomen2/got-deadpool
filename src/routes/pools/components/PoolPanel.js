import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Fab from '@material-ui/core/Fab'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FileCopy from '@material-ui/icons/FileCopy'
import Check from '@material-ui/icons/Check'
import Tooltip from '@material-ui/core/Tooltip'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { PoolPlayers, PoolPlayersPreGame } from './PoolPlayers'

export const PoolPanel = ({ pool, copiedPools, onCopy, handleExpand, gameStarted }) => {
  return (
    <ExpansionPanel onChange={handleExpand(pool)}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
        <Typography>{pool.name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className={'pool-panel-wrapper'}>
          {
            pool.players && (
              gameStarted ? <PoolPlayers poolPlayers={pool.players} poolId={pool.id} /> : <PoolPlayersPreGame poolPlayers={pool.players} poolId={pool.id} />
            )
          }
          <div className={'pool-actions'}>
            <CopyToClipboard
              text={pool.id}
              onCopy={() => onCopy(pool.id)}>
              <Tooltip title='Copy Pool Id to share with others'>
                <Fab color='secondary' aria-label='Edit'>
                  {copiedPools[pool.id]
                    ? <Check />
                    : <FileCopy />
                  }
                </Fab>
              </Tooltip>
            </CopyToClipboard>
          </div>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}
