import React from 'react'
import { Route, IndexRoute } from 'react-router'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import HomeView from 'views/HomeView'
import WikipediaView from 'views/WikipediaView'
import TwitchView from 'views/TwitchView'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path='/wikipedia' component={WikipediaView} />
    <Route path='/twitch' component={TwitchView} />
  </Route>
)
