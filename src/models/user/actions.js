import {
  AUTH_USER_ERROR,
  AUTH_USER_REQUEST,
  AUTH_USER_SUCCESS,
  USER_SIGN_OUT_ERROR,
  USER_SIGN_OUT_REQUEST,
  USER_SIGN_OUT_SUCCESS,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_CREATE_ERROR
} from './consts'
import { authRef, GoogleAuthProvider, dbRef } from '../../firebaseConfig'

export const fetchUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: AUTH_USER_SUCCESS,
        payload: user
      })
      dispatch(createUser(user))
    }
  })
}

export const createUser = (user) => (dispatch, getState) => {
  if (user) {
    dispatch({
      type: USER_CREATE_REQUEST
    })
    dbRef.collection('users').doc(`${user.uid}`).set({
      displayName: user.displayName,
      photoURL: user.photoURL
    }).then(res => {
      dispatch({
        type: USER_CREATE_SUCCESS
      })
    }).catch(e => {
      console.log(e)
      dispatch({
        type: USER_CREATE_ERROR
      })
    })
  }
}

export const signIn = () => dispatch => {
  dispatch({
    type: AUTH_USER_REQUEST
  })
  authRef
    .signInWithPopup(GoogleAuthProvider)
    .catch(error => {
      dispatch({
        type: AUTH_USER_ERROR,
        error: error
      })
    })
}

export const signOut = () => dispatch => {
  dispatch({
    type: USER_SIGN_OUT_REQUEST
  })
  authRef
    .signOut()
    .then(() => {
      dispatch({
        type: USER_SIGN_OUT_SUCCESS
      })
    })
    .catch(error => {
      dispatch({
        type: USER_SIGN_OUT_ERROR,
        error: error
      })
    })
}
