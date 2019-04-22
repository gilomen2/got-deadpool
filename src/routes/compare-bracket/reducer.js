import { COMPARE_USER_BRACKET_ERROR, COMPARE_USER_BRACKET_REQUEST, COMPARE_USER_BRACKET_SUCCESS } from './consts'
import { CLEAR_ERRORS } from '../../components/Error'

export default function compareBracket (state = { error: false, userBrackets: {} }, action) {
  switch (action.type) {
    case COMPARE_USER_BRACKET_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false
      }
    case COMPARE_USER_BRACKET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        userBrackets: {
          ...state.userBrackets,
          ...action.payload
        }
      }
    case COMPARE_USER_BRACKET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: false
      }
    default:
      return state
  }
}

export const selectCompareBracket = ({ compareBracket }, compareUser) => compareBracket.userBrackets[compareUser]
export const selectCompareBracketLoading = ({ compareBracket }) => compareBracket.isLoading
export const selectCompareBracketError = ({ compareBracket }) => compareBracket.error
