// @flow

import createReducer from 'create-reducer-map'

// ------------------------------------
// Constants
// ------------------------------------
const SOME_CONST = ''

// ------------------------------------
// Actions
// ------------------------------------
 export const someAction = (): Object => ({
  type: SOME_CONST,
  payload: {}
})

// ------------------------------------
// Reducer
// ------------------------------------
type initialStateType = {
  foa: number,
  boa: boolean
}

export const initialState: initialStateType = {
  foa: 0,
  boa: 'test'
}
export default createReducer(initialState, {
  [SOME_CONST]: (state, {payload}) => {}

  // [THUNK]: () => (dispatch, getState) => {}
})
