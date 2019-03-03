import {
  EMPTY_BRACKET_ERROR,
  EMPTY_BRACKET_REQUEST,
  EMPTY_BRACKET_SUCCESS, USER_BRACKET_ERROR, USER_BRACKET_REQUEST,
  USER_BRACKET_SAVE_ERROR,
  USER_BRACKET_SAVE_REQUEST,
  USER_BRACKET_SAVE_SUCCESS, USER_BRACKET_SUCCESS
} from './consts'
import { dbRef } from '../../firebaseConfig'
import { selectUser } from '../../models/user/reducer'
import { organizeCharacters, selectInitialCharacters } from './reducer'

export const getEmptyBracket = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const initialCharacters = selectInitialCharacters(getState())
    if (!initialCharacters) {
      dispatch({
        type: EMPTY_BRACKET_REQUEST
      })

      // const collection = dbRef.collection('characters')
      const collection = dbRef.collection('test-characters')

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
        resolve(organizeCharacters(snapshot.docs.map(doc => {
          return {
            name: doc.id,
            ...doc.data()
          }
        })))
      }).catch(e => {
        dispatch({
          type: EMPTY_BRACKET_ERROR,
          error: e
        })
        reject(e)
      })
    } else {
      resolve(initialCharacters)
    }
  })
}

export const getUserBracket = () => (dispatch, getState) => {
  const user = selectUser(getState())
  const collection = dbRef.collection('users')

  dispatch({
    type: USER_BRACKET_REQUEST
  })

  collection.doc(`${user.uid}`).get().then(snapshot => {
    dispatch({
      type: USER_BRACKET_SUCCESS,
      payload: snapshot.data().bracket
    })
  }).catch(e => {
    dispatch({
      type: USER_BRACKET_ERROR,
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
