import { POOL_USERS_SUCCESS, USER_POOLS_ERROR, USER_POOLS_REQUEST, USER_POOLS_SUCCESS } from './consts'
import { USER_SIGN_OUT_SUCCESS } from '../../models/user/consts'
import toPairsIn from 'lodash/toPairsIn'

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
    case POOL_USERS_SUCCESS:
      return {
        ...state,
        pools: state.pools.map(pool => {
          let updatedPlayers = {}
          if (pool.id === action.poolId) {
            updatedPlayers = {
              ...pool.players,
              ...action.payload
            }
            pool.players = updatedPlayers
          }
          return pool
        })
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
