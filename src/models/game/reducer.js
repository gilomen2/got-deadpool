import { GAME_ERROR, GAME_REQUEST, GAME_SUCCESS } from './consts'

export default function game (state = {}, action) {
  switch (action.type) {
    case GAME_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false
      }
    case GAME_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isStarted: action.payload.isStarted,
        lastEpisodeUpdated: action.payload.lastEpisodeUpdated,
        scoring: action.payload.scoring
      }
    case GAME_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state
  }
}

export const selectGameStatus = ({ game }) => game.isStarted
export const selectGameLastUpdated = ({ game }) => game.lastEpisodeUpdated
export const selectGameScoring = ({ game }) => game.scoring
