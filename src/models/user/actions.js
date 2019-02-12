import {
  AUTH_USER_ERROR,
  AUTH_USER_REQUEST,
  AUTH_USER_SUCCESS, USER_SIGN_OUT_ERROR,
  USER_SIGN_OUT_REQUEST,
  USER_SIGN_OUT_SUCCESS
} from './consts'
import { authRef, GoogleAuthProvider } from '../../firebaseConfig'

export const fetchUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: AUTH_USER_SUCCESS,
        payload: user
      })
    }
  })
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

export const selectUser = ({ user }) => {
  return user.user
}
