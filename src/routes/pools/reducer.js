import {
  ADD_USER_TO_POOL_ERROR,
  ADD_USER_TO_POOL_REQUEST, ADD_USER_TO_POOL_SUCCESS,
  POOL_USERS_ERROR,
  POOL_USERS_REQUEST,
  POOL_USERS_SUCCESS,
  USER_POOLS_ERROR,
  USER_POOLS_REQUEST,
  USER_POOLS_SUCCESS
} from './consts'
import { USER_SIGN_OUT_SUCCESS } from '../../models/user/consts'
import isEmpty from 'lodash/isEmpty'
import sortBy from 'lodash/sortBy'
import { CLEAR_ERRORS } from '../../components/Error'
import { rankPlayers } from '../../utils/rankPlayers'

export default function pools (state = { error: false }, action) {
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
        pools: action.payload.map(pool => {
          pool.players = organizePoolPlayers(pool.players)
          return pool
        }),
        isLoading: false
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
      if (isEmpty(state.pools.find(pool => action.poolId === pool.id).players)) {
        let players = []
        action.payload.forEach(item => {
          Object.keys(item).map(player => {
            item[player].id = player
            return players.push(item[player])
          })
        })
        return {
          ...state,
          isLoading: false,
          pools: state.pools.map(pool => {
            if (pool.id === action.poolId) {
              pool.players = organizePoolPlayers(players)
            }
            return pool
          })
        }
      } else {
        return {
          ...state,
          isLoading: false,
          error: false
        }
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
    case ADD_USER_TO_POOL_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false
      }
    case ADD_USER_TO_POOL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false
      }
    case ADD_USER_TO_POOL_ERROR:
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

const organizePoolPlayers = (poolPlayers) => {
  let ranked = rankPlayers(poolPlayers)
  let sortedPlayers = sortBy(ranked, 'rank')
  return sortedPlayers || poolPlayers
}

export const selectPools = ({ pools }) => pools.pools
export const selectPoolsLoading = ({ pools }) => pools.isLoading
export const selectPoolsError = ({ pools }) => pools.error
