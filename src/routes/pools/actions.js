import { dbRef } from '../../firebaseConfig'
import { selectUser } from '../../models/user/actions'
import { USER_POOLS_ERROR, USER_POOLS_REQUEST, USER_POOLS_SUCCESS } from './consts'

export const getPools = () => (dispatch, getState) => {
  dispatch({
    type: USER_POOLS_REQUEST
  })
  const userId = selectUser(getState()).uid
  const collection = dbRef.collection('pools')
  if (collection) {
    debugger
    collection.where('users', 'array-contains', `${userId}`).get().then((data) => {
      debugger
      dispatch({
        type: USER_POOLS_SUCCESS,
        payload: data
      })
    }).catch(e => {
      debugger
      dispatch({
        type: USER_POOLS_ERROR,
        error: e
      })
    })
  }
}

export const selectPools = ({ pools }) => pools.pools
