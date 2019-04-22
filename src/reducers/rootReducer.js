import { combineReducers } from 'redux'
import user from '../models/user/reducer'
import pools from '../routes/pools/reducer'
import bracket from '../routes/bracket/reducer'
import game from '../models/game/reducer'
import compareBracket from '../routes/compare-bracket/reducer'

export default combineReducers({
  user,
  pools,
  bracket,
  game,
  compareBracket
})
