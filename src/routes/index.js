import React from 'react'
import { Route, IndexRoute } from 'react-router'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import HomeView from 'views/HomeView'
import WikipediaView from 'views/WikipediaView'
import TwitchView from 'views/TwitchView'
//gardenize
import QuestionsListView from '../views/GardenizeView/QuestionsListView'
import QuestionDetailsView from '../views/GardenizeView/QuestionDetailsView'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path='wikipedia' component={WikipediaView} />
    <Route path='twitch' component={TwitchView} />
    <Route path='gardenize'>
      <IndexRoute component={QuestionsListView} />
      <Route path=':id' component={QuestionDetailsView} />
    </Route>
  </Route>
)
