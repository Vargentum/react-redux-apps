import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from "./modules/counterCustom"
import wikipedia from "./modules/Wikipedia"
import twitch from './modules/Twitch'
import gardenizeQuestionsList from './modules/gardenize/QuestionsList'
import gardenizeQuestionDetails from './modules/gardenize/QuestionDetails'

export default combineReducers({
  router,
  counter,
  wikipedia,
  twitch,
  gardenizeQuestionsList,
  gardenizeQuestionDetails
})
