import reqwest from 'reqwest'
// import _ from 'lodash'
// import URI from 'urijs'

export const API_ENDPOINT = "https://api.twitch.tv/kraken/"

// Constants
const STREAMERS = ["freecodecamp",
                   "storbeck",
                   "terakilobyte",
                   "habathcx",
                   "RobotCaleb",
                   "thomasballinger",
                   "noobs2ninjas",
                   "beohoff",
                   "brunofin",
                   "comster404"]

// Action Creators
export const loadStreamers = function() {
  return {
    type: "START",
    payload: STREAMERS
  }
}

const requestUser = (name) => {
  return new Promise((resolve, reject) => {
    reqwest({
      url: API_ENDPOINT + 'users/' + name,
      headers: {
        Accept: 'application/vnd.twitchtv.v3+json'
      },
      success: resolve,
      error: reject
    })
  })
}

// thunk
export const loadAllUsers = () => (dispatch, getState) => {
  const streamers = STREAMERS.map(requestUser)
  Promise.all(streamers)
    .then((responses) => {
      dispatch({
        type: "LOADED",
        payload: responses
      })
    })
    .catch((e) => {
      console.log(e.name)
    })
}

// Reducer
export const initialState = {
  loading: false,
  loaded: false,
  streamers: []
}

export default function (state = initialState, {type, payload}) {
  switch (type) {
    case "LOADED":
      return Object.assign({}, state, {loaded: true, data: payload})
    default:
      return state
  }
}
