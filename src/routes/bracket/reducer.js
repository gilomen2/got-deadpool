import { EMPTY_BRACKET_ERROR, EMPTY_BRACKET_REQUEST, EMPTY_BRACKET_SUCCESS } from './consts'
import { POOL_USERS_SUCCESS } from '../pools/consts'

export default function bracket (state = {}, action) {
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
      if (action.payload[action.currentUser.uid]) {
        return {
          ...state,
          userBracket: action.payload[action.currentUser.uid].bracket
        }
      } else {
        return state
      }
    default:
      return state
  }
}

const organizeCharacters = (characters) => {
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
