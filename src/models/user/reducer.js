import { AUTH_USER_SUCCESS } from './consts'

export default function user (state = {}, action) {
  switch (action.type) {
    case AUTH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state
  }
}
