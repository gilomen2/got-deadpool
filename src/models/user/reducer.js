import {
  AUTH_USER_ERROR,
  AUTH_USER_REQUEST,
  AUTH_USER_SUCCESS, USER_SIGN_OUT_ERROR,
  USER_SIGN_OUT_REQUEST,
  USER_SIGN_OUT_SUCCESS
} from './consts'

export default function user (state = {}, action) {
  switch (action.type) {
    case AUTH_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false
      }
    case AUTH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload
      }
    case AUTH_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case USER_SIGN_OUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      }
    case USER_SIGN_OUT_SUCCESS:
      return {
        ...state,
        user: null
      }
    case USER_SIGN_OUT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state
  }
}
