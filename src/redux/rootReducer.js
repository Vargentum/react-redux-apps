import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from "./modules/counterCustom"
import wikipedia from "./modules/Wikipedia"
import twitch from './modules/Twitch'
import calculator from './modules/Calculator'

export default combineReducers({
  router,
  counter,
  wikipedia,
  twitch,
  calculator
})
