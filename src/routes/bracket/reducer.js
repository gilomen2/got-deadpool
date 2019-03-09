import {
  EMPTY_BRACKET_ERROR,
  EMPTY_BRACKET_REQUEST,
  EMPTY_BRACKET_SUCCESS, USER_BRACKET_ERROR,
  USER_BRACKET_REQUEST,
  USER_BRACKET_SUCCESS
} from './consts'
import { POOL_USERS_SUCCESS } from '../pools/consts'
import { CLEAR_ERRORS } from '../../components/Error'
import { USER_SIGN_OUT_SUCCESS } from '../../models/user/consts'

export default function bracket (state = { error: false }, action) {
  switch (action.type) {
    case EMPTY_BRACKET_REQUEST:
      return {
        ...state
      }
    case EMPTY_BRACKET_SUCCESS:
      return {
        ...state,
        initialCharacters: organizeCharacters(action.payload)
      }
    case EMPTY_BRACKET_ERROR:
      return {
        ...state,
        error: action.error
      }
    case POOL_USERS_SUCCESS:
      const currentUserBracket = action.payload.find(u => Object.keys(u)[0] === action.currentUser.uid)[action.currentUser.uid].bracket

      if (currentUserBracket) {
        return {
          ...state,
          userBracket: currentUserBracket
        }
      } else {
        return state
      }
    case USER_BRACKET_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false
      }
    case USER_BRACKET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        userBracket: action.payload
      }
    case USER_BRACKET_ERROR:
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
    case USER_SIGN_OUT_SUCCESS:
      return {
        ...state,
        userBracket: undefined
      }
    default:
      return state
  }
}

export const organizeCharacters = (characters) => {
  let byHouses = {}
  characters.forEach(character => {
    if (!character.houseAffiliation) {
      character.houseAffiliation = 'Unaffiliated'
    }
    byHouses[character.houseAffiliation] = byHouses[character.houseAffiliation] ? [...byHouses[character.houseAffiliation], character] : [character]
  })
  return byHouses
}

export const selectInitialCharacters = ({ bracket }) => bracket.initialCharacters
export const selectUserBracket = ({ bracket }) => bracket.userBracket
export const selectBracketLoading = ({ bracket }) => bracket.isLoading
export const selectBracketError = ({ bracket }) => bracket.error
