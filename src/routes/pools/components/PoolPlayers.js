import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

export const PoolPlayers = ({ poolPlayers, poolId }) => {
  return (
    <div className={'pool-players-list'}>
      {poolPlayers.map((player) => {
        return <PoolPlayer photoUrl={player.photoURL} displayName={player.displayName} key={`pool-player-${player.id}-${poolId}`} score={player.score} />
      })}
    </div>
  )
}

const PoolPlayer = ({ photoUrl, displayName, score }) => {
  return (
    <List>
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <Avatar alt={displayName} src={photoUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography component='span' color='textPrimary'>
                {displayName} | {score}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  )
}
