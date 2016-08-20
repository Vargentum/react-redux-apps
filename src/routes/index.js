import React from 'react'
import { Route, IndexRoute } from 'react-router'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import HomeView from 'views/HomeView'
import WikipediaView from 'views/WikipediaView'
import TwitchView from 'views/TwitchView'
import CalculatorView from 'views/CalculatorView'
import PomodoroView from 'views/PomodoroView'
import TTTView from 'views/TTTView'
import SimonView from 'views/SimonView'
import MarkdownView from 'views/MarkdownView'
import CamperLeaderboardView from 'views/CamperLeaderboardView'

// gardenize
import QuestionsListView from '../views/GardenizeView/QuestionsListView'
import QuestionDetailsView from '../views/GardenizeView/QuestionDetailsView'
import {resetScrollPosition} from '../redux/modules/gardenize/common'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path='wikipedia' component={WikipediaView} />
    <Route path='twitch' component={TwitchView} />
    <Route path='gardenize'>
      <IndexRoute component={QuestionsListView} />
      <Route path=':id'
             component={QuestionDetailsView}
             onEnter={resetScrollPosition} />
    </Route>
    <Route path='/calculator' component={CalculatorView} />
    <Route path='/ttt' component={TTTView} />
    <Route path='/simon' component={SimonView} />
    <Route path='/markdown' component={MarkdownView} />
    <Route path='/leaderboard' component={CamperLeaderboardView} />
  </Route>
)
