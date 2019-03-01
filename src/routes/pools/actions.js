import { dbRef, fbstore } from '../../firebaseConfig'
import { selectUser } from '../../models/user/reducer'
import {
  ADD_USER_TO_POOL_ERROR,
  ADD_USER_TO_POOL_REQUEST,
  ADD_USER_TO_POOL_SUCCESS,
  USER_POOLS_ERROR,
  USER_POOLS_REQUEST,
  USER_POOLS_SUCCESS,
  POOL_USERS_REQUEST,
  POOL_USERS_SUCCESS,
  POOL_USERS_ERROR,
  CREATE_POOL_REQUEST,
  CREATE_POOL_SUCCESS,
  CREATE_POOL_ERROR, RECORD_SCORES_REQUEST, RECORD_SCORES_SUCCESS, RECORD_SCORES_ERROR
} from './consts'
import { selectGameLastUpdated, selectGameScoring, selectGameStatus } from '../../models/game/reducer'
import findKey from 'lodash/findKey'
import find from 'lodash/find'
import { selectPools } from './reducer'
import { getEmptyBracket } from '../bracket/actions'

export const getPools = () => (dispatch, getState) => {
  dispatch({
    type: USER_POOLS_REQUEST
  })
  const collection = dbRef.collection('pools')
  const userId = selectUser(getState()).uid

  if (collection) {
    collection.where('users', 'array-contains', `${userId}`).get().then((snapshot) => {
      dispatch({
        type: USER_POOLS_SUCCESS,
        payload: snapshot.docs.map(doc => {
          const poolData = doc.data()
          if (!poolData.players) {
            dispatch(getPoolPlayersData(doc.id, poolData.users))
          }
          return {
            id: doc.id,
            ...poolData
          }
        })
      })
    }).catch(e => {
      dispatch({
        type: USER_POOLS_ERROR,
        error: e
      })
    })
  }
}

export const addUserToPool = (poolId) => (dispatch, getState) => {
  dispatch({
    type: ADD_USER_TO_POOL_REQUEST
  })
  const collection = dbRef.collection('pools')
  const userId = selectUser(getState()).uid
  const pool = collection.doc(`${poolId}`)
  pool.update({
    users: fbstore.FieldValue.arrayUnion(userId)
  }).then((snapshot) => {
    dispatch({
      type: ADD_USER_TO_POOL_SUCCESS
    })
    dispatch(getPools())
  }).catch(e => {
    dispatch({
      type: ADD_USER_TO_POOL_ERROR
    })
  })
}

export const getPoolPlayersData = (poolId, poolUsers) => (dispatch, getState) => {
  const collection = dbRef.collection('users')
  dispatch({
    type: POOL_USERS_REQUEST
  })
  let promises = []
  poolUsers.forEach(userId => {
    promises.push(collection.doc(userId).get().then(user => {
      return user.data()
    }))
  })
  return Promise.all(promises).then(data => {
    dispatch({
      type: POOL_USERS_SUCCESS,
      payload: data,
      poolId,
      currentUser: selectUser(getState())
    })
  }).catch(e => {
    dispatch({
      type: POOL_USERS_ERROR,
      error: e
    })
  })
}

export const createPoolAndAddUser = (poolName) => (dispatch, getState) => {
  dispatch({
    type: CREATE_POOL_REQUEST
  })
  const collection = dbRef.collection('pools')
  const userId = selectUser(getState()).uid

  collection.add({
    name: poolName,
    users: [
      userId
    ],
    game: dbRef.collection('game').doc('test1')
  }).then(snapshot => {
    dispatch({
      type: CREATE_POOL_SUCCESS
    })
    dispatch(getPools())
  }).catch(e => {
    dispatch({
      type: CREATE_POOL_ERROR
    })
  })
}

export const calcPoolResults = (poolId) => (dispatch, getState) => {
  const state = getState()
  const gameLastUpdated = selectGameLastUpdated(state)
  const gameStarted = selectGameStatus(state)
  const gameScoring = selectGameScoring(state)
  const pools = selectPools(state)
  const pool = find(pools, ['id', poolId])
  const hasResults = pool.gameLastUpdated && pool.gameLastUpdated === gameLastUpdated

  if (gameStarted && gameLastUpdated && !hasResults) {
    return dispatch(getEmptyBracket()).then((characterData) => {
      let poolPlayers = pool.players
      let playerScores = {}
      Object.keys(poolPlayers).forEach(player => {
        let score = 0
        Object.keys(poolPlayers[player].bracket).forEach(character => {
          let characterStatus = find(characterData, function (house) {
            return find(house, function (person) {
              return person.name === character
            })
          })[0]
          let characterPrediction = poolPlayers[player].bracket[character]
          if (characterStatus && characterStatus.lastEpisodeAlive) {
            const diff = Math.abs(characterStatus.lastEpisodeAlive - characterPrediction)
            if (characterStatus.lastEpisodeAlive === 0) {
              if (characterPrediction === 0) {
                score += gameScoring.survivor.correct
              } else {
                score += gameScoring.episodeDeath.survives
              }
            } else {
              if (diff > 3) {
                score += gameScoring.episodeDeath.offByMore
              } else if (diff === 3) {
                score += gameScoring.episodeDeath.offBy3
              } else if (diff === 2) {
                score += gameScoring.episodeDeath.offBy2
              } else if (diff === 1) {
                score += gameScoring.episodeDeath.offBy1
              } else if (diff === 0) {
                score += gameScoring.episodeDeath.correct
              }
            }
          }
        })
        playerScores[player] = score
      })
      dispatch(recordPoolResults(pool, playerScores))
    })
  }
}

const recordPoolResults = (pool, playerScores) => (dispatch, getState) => {
  let updatedPoolUsers = {}

  Object.keys(pool.players).forEach(player => {
    updatedPoolUsers[player] = pool.players[player]
    updatedPoolUsers[player].score = playerScores[player]
  })
  const poolRef = dbRef.collection('pools').doc(`${pool.id}`)
  dispatch({
    type: RECORD_SCORES_REQUEST
  })
  poolRef.set({
    gameLastUpdated: selectGameLastUpdated(getState()),
    players: updatedPoolUsers
  }, { merge: true }).then(res => {
    dispatch({
      type: RECORD_SCORES_SUCCESS
    })
  }).catch(e => {
    dispatch({
      type: RECORD_SCORES_ERROR,
      error: e
    })
  })
}
