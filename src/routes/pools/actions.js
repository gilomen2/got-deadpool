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
  CREATE_POOL_ERROR
} from './consts'
import { selectGameStatus } from '../../models/game/reducer'

export const getPools = () => (dispatch, getState) => {
  dispatch({
    type: USER_POOLS_REQUEST
  })
  const collection = dbRef.collection('pools')
  const userId = selectUser(getState()).uid
  const gameStarted = selectGameStatus(getState())

  if (collection) {
    collection.where('users', 'array-contains', `${userId}`).get().then((snapshot) => {
      dispatch({
        type: USER_POOLS_SUCCESS,
        payload: snapshot.docs.map(doc => {
          const poolData = doc.data()
          if (!gameStarted || !poolData.players) {
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
        error: e.message
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
  pool.get().then(poolRef => {
    if (poolRef.exists) {
      let poolData = poolRef.data()
      if (poolData.users.length >= 50) {
        throw new Error('The pool already has 50 members. Try creating a new pool.')
      } else {
        pool.update({
          users: fbstore.FieldValue.arrayUnion(userId)
        }).then((snapshot) => {
          dispatch({
            type: ADD_USER_TO_POOL_SUCCESS
          })
          window.ga('send', 'event', 'Pools', 'add-user-to-pool')
          dispatch(getPools())
        }).catch(e => {
          dispatch({
            type: ADD_USER_TO_POOL_ERROR,
            error: e.message
          })
        })
      }
    } else {
      throw new Error(`That pool doesn't exist. Double check the ID with the person who gave it to you.`)
    }
  }).catch(e => {
    if (e.name === 'FirebaseError') {
      dispatch({
        type: ADD_USER_TO_POOL_ERROR,
        error: 'Something went wrong. Could not add the user to the pool.'
      })
    } else {
      dispatch({
        type: ADD_USER_TO_POOL_ERROR,
        error: e.message
      })
    }
  })
}

export const getPoolPlayersData = (poolId, poolUsers) => (dispatch, getState) => {
  const collection = dbRef.collection('users')
  dispatch({
    type: POOL_USERS_REQUEST
  })
  let promises = poolUsers.map(userId => collection.doc(userId).get().then(user => {
    return {
      [user.id]: user.data()
    }
  }))
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
      error: e.message
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
    ]
  }).then(snapshot => {
    dispatch({
      type: CREATE_POOL_SUCCESS
    })
    window.ga('send', 'event', 'Pools', 'create-pool')
    dispatch(getPools())
  }).catch(e => {
    dispatch({
      type: CREATE_POOL_ERROR,
      error: e.message
    })
  })
}
