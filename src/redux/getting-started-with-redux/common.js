import React, {Component, PropTypes} from 'react'
import {createStore} from 'redux'


/*lesson 8: createStore implementation*/

function createStore(reducer) {
  let state = {}
  const subscribtions = []
  
  const getStore = () => state

  const dispatch = (action) => {
    state = reducer(state, action)
    subscribtions.forEach((subscribtion) => subscribtion())
  }
  const subscribe = (subscribtion) => {
    subscribtions.push(subscribtion)
    return () => 
      subscribtions = subscriptions.filter((s) => s !== subscribtion)
      /*
        const s = store.subscribe(someHandler)
        s() // unsubscribe `someHandler`
      */
  }

  dispatch({}) // init store as empty object

  return {
    getStore,
    dispatch,
    subscribe
  }
}



/* lesson 14: combineReducers */

const todos = (state, action) => state 
const visibilityFilter = (state, action) => state 

const todoApp = (state, action) => {
  todos: todos(state.todos, action),
  visibilityFilter: visibilityFilter(state.visibilityFilter, action)
}

// const combineReducers = (reducers) => (state = {}, action) => 
//   Object.keys(reducers).forEach(key => reducers[key](state[key], action))

const combineReducers = (reducers) => (state = {}, action) => 
  Object.keys(reducers)
        .reduce((nextState, key) => {
          nextState[key] = reducers[key](state[key], action)
          return nextState
        }, {})

const todoApp1 = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
})


/* lesson 22: force updates the component */

const store = createStore(() => {})

class FilterLink extends Component {
  componentDidMount () {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
    })
  }
  componentWillUnmount () {
    this.unsubscribe() 
  }
  render() {
    const state = store.getState()
    return (
      <div 
        onClick={store.dispatch({
          type: 'SOME_ACTION'
        })} />
    )
  }
}


/* lesson 28: inject dispatch into Component */
let Stateless = ({ dispatch }) => 
  <div onClick={dispatch({
    type: 'SOME_ACTION'
  })} />

Stateless = connect(/*null, null*/)(Stateless)


