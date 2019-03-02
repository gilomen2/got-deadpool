import {
  POOL_USERS_ERROR,
  POOL_USERS_REQUEST,
  POOL_USERS_SUCCESS,
  USER_POOLS_ERROR,
  USER_POOLS_REQUEST,
  USER_POOLS_SUCCESS
} from './consts'
import { USER_SIGN_OUT_SUCCESS } from '../../models/user/consts'

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
        pools: action.payload,
        isLoading: false,
        poolsLoaded: true
      }
    case USER_POOLS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case POOL_USERS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case POOL_USERS_SUCCESS:
      let players = []
      action.payload.forEach(item => {
        Object.keys(item).map(player => {
          item[player].id = player
          players.push(item[player])
        })
      })
      return {
        ...state,
        pools: state.pools.map(pool => {
          pool.players = organizePoolPlayers(players)
          return pool
        })
      }
    case POOL_USERS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case USER_SIGN_OUT_SUCCESS:
      return {
        ...state,
        pools: []
      }
    default:
      return state
  }
}

const organizePoolPlayers = (poolPlayers) => {
  return poolPlayers
}

export const selectPools = ({ pools }) => pools.pools
export const selectPoolsLoading = ({ pools }) => pools.isLoading
export const selectPoolsLoaded = ({ pools }) => pools.poolsLoaded
