import { combineReducers } from 'redux'
import user from '../models/user/reducer'
import pools from '../routes/pools/reducer'
import bracket from '../routes/bracket/reducer'

export default combineReducers({
  user,
  pools,
  bracket
})
