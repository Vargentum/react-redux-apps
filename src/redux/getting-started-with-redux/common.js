
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




