import { GAME_ERROR, GAME_REQUEST, GAME_SUCCESS } from './consts'
import { dbRef } from '../../fbConfig'

export const getGame = () => (dispatch, getState) => {
  dispatch({ type: GAME_REQUEST })
  const collection = dbRef.collection('game')
  collection.doc('master').get().then(res => {
    dispatch({
      type: GAME_SUCCESS,
      payload: res.data()
    })
  }).catch(e => {
    dispatch({
      type: GAME_ERROR,
      error: e
    })
  })
}
