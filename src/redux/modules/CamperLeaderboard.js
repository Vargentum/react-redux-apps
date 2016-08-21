// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_DATA = 'camperLeaderboard/FETCH_DATA'
export const FETCH_DATA_SUCCESS = 'camperLeaderboard/FETCH_DATA_SUCCESS'
export const FETCH_DATA_FAIL = 'camperLeaderboard/FETCH_DATA_FAIL'

// ------------------------------------
// Actions
// ------------------------------------
export const loadUsers = () => ({
  type: FETCH_DATA
})

// ------------------------------------
// Action Creators
// ------------------------------------
const ACTION_CREATORS = {
  [FETCH_DATA_SUCCESS]: (state, {payload: {data}}) => ({
    ...state,
    users: data
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {
  users: []
}
export default function (state = initialState, action) {
  const handler = ACTION_CREATORS[action.type]
  return handler ? handler(state, action) : state
}
