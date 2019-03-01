import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

export const PoolPlayers = ({ poolPlayers }) => {
  return (
    <div className={'pool-players-list'}>
      {Object.keys(poolPlayers).map((player, i) => {
        return <PoolPlayer photoUrl={poolPlayers[player].photoURL} displayName={poolPlayers[player].displayName} key={`pool-player-${i}`} score={poolPlayers[player].score} />
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
