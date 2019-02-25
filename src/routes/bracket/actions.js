import {
  EMPTY_BRACKET_ERROR,
  EMPTY_BRACKET_REQUEST,
  EMPTY_BRACKET_SUCCESS,
  USER_BRACKET_SAVE_ERROR,
  USER_BRACKET_SAVE_REQUEST,
  USER_BRACKET_SAVE_SUCCESS
} from './consts'
import { dbRef } from '../../firebaseConfig'
import { selectUser } from '../../models/user/reducer'

export const getEmptyBracket = () => (dispatch, getState) => {
  dispatch({
    type: EMPTY_BRACKET_REQUEST
  })

  // const collection = dbRef.collection('characters')
  const collection = dbRef.collection('characters')

  collection.get().then(snapshot => {
    dispatch({
      type: EMPTY_BRACKET_SUCCESS,
      payload: snapshot.docs.map(doc => {
        return {
          name: doc.id,
          ...doc.data()
        }
      })
    })
  }).catch(e => {
    dispatch({
      type: EMPTY_BRACKET_ERROR,
      error: e
    })
  })
}

export const saveUserBracket = (characterBracket) => (dispatch, getState) => {
  dispatch({
    type: USER_BRACKET_SAVE_REQUEST
  })
  const user = selectUser(getState())
  const collection = dbRef.collection('users')

  collection.doc(`${user.uid}`).set({
    bracket: characterBracket
  }, { merge: true }).then(res => {
    dispatch({
      type: USER_BRACKET_SAVE_SUCCESS
    })
  }).catch(e => {
    dispatch({
      type: USER_BRACKET_SAVE_ERROR,
      error: e
    })
  })
}
