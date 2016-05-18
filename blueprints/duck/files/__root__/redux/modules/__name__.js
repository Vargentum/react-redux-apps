// ------------------------------------
// Constants
// ------------------------------------
const SOME_CONST = ''

// ------------------------------------
// Actions
// ------------------------------------
 export const someAction = () => ({
  type: SOME_CONST,
  payload: 
})

// ------------------------------------
// Action Creators
// ------------------------------------
const ACTION_CREATORS = {
  [SOME_CONST]: (state, {payload}) => {}

  [THUNK]: () => (dispatch, getState) => {}
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {}
export default function (state = initialState, action) {
  const handler = ACTION_CREATORS[action.type]
  return handler ? handler(state, action) : state
}
