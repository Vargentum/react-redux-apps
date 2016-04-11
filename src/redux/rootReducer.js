import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from "./modules/counterCustom"
import wikipedia from "./modules/Wikipedia"
import twitch from './modules/Twitch'

export default combineReducers({
  router,
  counter,
  wikipedia,
  twitch
})
