import { AUTH_USER_SUCCESS } from './consts'
import { authRef } from '../../firebaseConfig'

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

export const selectUser = ({ user }) => {
  return user.user
}
