import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import {reducer as form} from 'redux-form'
import counter from "./modules/counterCustom"
import wikipedia from "./modules/Wikipedia"
import twitch from './modules/Twitch'
import calculator from './modules/Calculator'
import gardenizeQuestionsList from './modules/gardenize/QuestionsList'
import gardenizeQuestionDetails from './modules/gardenize/QuestionDetails'
import pomodoro from './modules/pomodoro'
import ttt from './modules/ttt/ttt'

export default combineReducers({
  router,
  form,
  counter,
  wikipedia,
  twitch,
  gardenizeQuestionsList,
  gardenizeQuestionDetails,
  calculator,
  pomodoro,
  ttt
})
