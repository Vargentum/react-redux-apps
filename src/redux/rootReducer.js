import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from "./modules/counterCustom"

export default combineReducers({
  router,
  counter
})
