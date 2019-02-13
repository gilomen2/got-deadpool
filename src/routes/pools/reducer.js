import { USER_POOLS_ERROR, USER_POOLS_REQUEST, USER_POOLS_SUCCESS } from './consts'

export default function pools (state = {}, action) {
  switch (action.type) {
    case USER_POOLS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false
      }
    case USER_POOLS_SUCCESS:
      return {
        ...state,
        pools: action.payload
      }
    case USER_POOLS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state
  }
}