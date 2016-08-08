import createReducer from 'create-reducer-map'

// ------------------------------------
// Constants
// ------------------------------------
const SOME_CONST = ''

// ------------------------------------
// Actions
// ------------------------------------
 export const someAction = () => ({
  type: SOME_CONST,
  payload: {}
})

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {}
export default createReducer(initialState, {
  [SOME_CONST]: (state, {payload}) => {}

  // [THUNK]: () => (dispatch, getState) => {}
})