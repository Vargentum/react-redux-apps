// Constants
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'

function increment () {
  return {
    type: COUNTER_INCREMENT
  }
}

// Action Creators
export const actions = {
  increment
}

// Reducer
export const initialState = 0
export default function (state = initialState, action) {
  switch (action.type) {
    case COUNTER_INCREMENT:
      return state + 1
    default:
      return state
  }
}
