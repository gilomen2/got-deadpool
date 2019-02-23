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
  POOL_USERS_ERROR
} from './consts'

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
          dispatch(getPoolPlayersData(doc.id, doc.data().users))
          return {
            id: doc.id,
            ...doc.data()
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
  dbRef.runTransaction((transaction) => {
    let poolPlayers = {}
    poolUsers.forEach(userId => {
      return transaction.get(collection.doc(userId)).then(user => {
        poolPlayers[userId] = user.data()
      })
    })
    return Promise.resolve(poolPlayers)
  }).then(data => {
    dispatch({
      type: POOL_USERS_SUCCESS,
      payload: data,
      poolId
    })
  }).catch(e => {
    dispatch({
      type: POOL_USERS_ERROR,
      error: e
    })
  })
}
