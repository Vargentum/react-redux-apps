import React from 'react'
import { Route, IndexRoute } from 'react-router'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import HomeView from 'views/HomeView'
import CounterView from 'views/CounterView'
import WikipediaView from 'views/WikipediaView'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path='/counter' component={CounterView} />
    <Route path='/wikipedia' component={WikipediaView} />
  </Route>
)
