import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

export const PoolPlayersPreGame = ({ poolPlayers, poolId }) => {
  return (
    <div className={'pool-players-list'}>
      {poolPlayers.map((player) => {
        return <PoolPlayerPreGame photoUrl={player.photoURL} displayName={player.displayName} key={`pool-player-${player.id}-${poolId}`} score={player.score} />
      })}
    </div>
  )
}

export const PoolPlayers = ({ poolPlayers, poolId, media }) => {
  return (
    <div className={'pool-players-list full-width'}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding={media.mobile ? 'none' : 'default'} />
            <TableCell padding={media.mobile ? 'none' : 'default'} align='center'>Player</TableCell>
            <TableCell padding={media.mobile ? 'none' : 'default'} align='center'>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {poolPlayers.map((player) => {
            return <PoolPlayer media={media} photoUrl={player.photoURL} displayName={player.displayName} key={`pool-player-${player.id}-${poolId}`} score={player.score} rank={player.rank} />
          })}
        </TableBody>
      </Table>
    </div>
  )
}

const PoolPlayer = ({ photoUrl, displayName, score, rank, media }) => {
  return (
    <TableRow>
      <TableCell padding={media.mobile ? 'none' : 'default'} align='center'>{rank}</TableCell>
      <TableCell padding={media.mobile ? 'none' : 'default'} align='center'>
        <div className={'player-content'}>
          <div className='avatar-wrapper'>
            <Avatar alt={displayName} src={photoUrl} />
            <span>{displayName}</span>
          </div>
        </div>
      </TableCell>
      <TableCell padding={media.mobile ? 'none' : 'default'} align='center'>{score}</TableCell>
    </TableRow>
  )
}

const PoolPlayerPreGame = ({ photoUrl, displayName, score }) => {
  return (
    <List>
      <ListItem alignItems='flex-start' disableGutters>
        <ListItemAvatar>
          <Avatar alt={displayName} src={photoUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography component='span' color='textPrimary' noWrap>
                {displayName}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  )
}
