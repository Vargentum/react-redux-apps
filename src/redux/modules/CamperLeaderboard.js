// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_LOADING = 'camperLeaderboard/FETCH_LOADING'
export const FETCH_FAIL = 'camperLeaderboard/FETCH_FAIL'

export const FETCH_RECENT = 'camperLeaderboard/FETCH_RECENT'
export const FETCH_RECENT_SUCCESS = 'camperLeaderboard/FETCH_RECENT_SUCCESS'

export const FETCH_ALLTIME = 'camperLeaderboard/FETCH_ALLTIME'
export const FETCH_ALLTIME_SUCCESS = 'camperLeaderboard/FETCH_ALLTIME_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
export const loadUsers = (type) => ({type})

const onDataSuccess = (type) => (state, {payload: {data}}) => ({
  ...state,
  users: {...state.users, [type]: data},
  loading: false
})

// ------------------------------------
// Action Creators
// ------------------------------------
const ACTION_CREATORS = {
  [FETCH_LOADING]: (state) => ({
    ...state,
    loading: true
  }),
  [FETCH_FAIL]: (state, {payload: {error}}) => ({
    ...state,
    loading: false,
    error
  }),
  [FETCH_RECENT_SUCCESS]: onDataSuccess(FETCH_RECENT),
  [FETCH_ALLTIME_SUCCESS]: onDataSuccess(FETCH_ALLTIME)
}
// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {
  initDataType: FETCH_RECENT, 
  loading: false,
  users: {
    [FETCH_RECENT]: [],
    [FETCH_ALLTIME]: []
  }
}
export default function (state = initialState, action) {
  const handler = ACTION_CREATORS[action.type]
  return handler ? handler(state, action) : state
}
