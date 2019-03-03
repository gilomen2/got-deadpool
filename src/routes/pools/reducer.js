import {
  ADD_USER_TO_POOL_ERROR,
  ADD_USER_TO_POOL_REQUEST, ADD_USER_TO_POOL_SUCCESS,
  POOL_USERS_ERROR,
  POOL_USERS_REQUEST,
  POOL_USERS_SUCCESS, RECORD_SCORES_ERROR, RECORD_SCORES_REQUEST, RECORD_SCORES_SUCCESS,
  USER_POOLS_ERROR,
  USER_POOLS_REQUEST,
  USER_POOLS_SUCCESS
} from './consts'
import { USER_SIGN_OUT_SUCCESS } from '../../models/user/consts'
import isEmpty from 'lodash/isEmpty'
import sortBy from 'lodash/sortBy'

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
            players.push(item[player])
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
    case RECORD_SCORES_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false
      }
    case RECORD_SCORES_SUCCESS:
      return {
        ...state,
        pools: state.pools.map(pool => {
          if (pool.id === action.poolId) {
            pool.players = organizePoolPlayers(pool.players)
          }
          return pool
        }),
        isLoading: false,
        error: false
      }
    case RECORD_SCORES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
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
        error: `The pool is either full or doesn't exist. Confirm the pool id with the person who gave it to you, or ask if they pool already has 50 users.`
      }
    default:
      return state
  }
}

const organizePoolPlayers = (poolPlayers) => {
  let sortedPlayers = sortBy(poolPlayers, 'rank')
  return sortedPlayers || poolPlayers
}

export const selectPools = ({ pools }) => pools.pools
export const selectPoolsLoading = ({ pools }) => pools.isLoading
