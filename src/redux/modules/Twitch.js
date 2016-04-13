import reqwest from 'reqwest'
import _ from 'lodash'
// import URI from 'urijs'

export const API_ENDPOINT = "https://api.twitch.tv/kraken/"

// Constants
const USERS = [
  "esl_sc2",
  "freecodecamp",
  "storbeck",
  "terakilobyte",
  "habathcx",
  "RobotCaleb",
  "thomasballinger",
  "noobs2ninjas",
  "beohoff",
  "brunofin",
  "comster404"
]

// Action Creators
export const loadStreamers = function() {
  return {
    type: "START",
    payload: USERS
  }
}

const requestResource = (type, name) => {
  return new Promise((resolve, reject) => {
    reqwest({
      url: API_ENDPOINT + type + '/' + name,
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
  const usersData = USERS.map(_.partial(requestResource, 'users'))

  dispatch({
    type: "USERS_LOADING_START"
  })

  Promise.all(usersData)
    .then((responses) => {
      dispatch({
        type: "USERS_LOADING_SUCCESS",
        payload: responses
      })
    })
    .catch((e) => {
      dispatch({
        type: "USERS_LOADING_ERROR",
        payload: e
      })
    })
}

export const loadAllStreams = () => (dispatch, getState) => {
  const streamsData = USERS.map(_.partial(requestResource, 'streams'))
  const onSuccess = (response) => dispatch({
    type: "STREAM_LOADED",
    payload: response
  })

  const onFail = (error) => dispatch({
    type: "STREAM_FAILED",
    payload: JSON.parse(error.response)
  })

  streamsData.forEach((data) => data
    .then(onSuccess)
    .catch(onFail)
  )
}

// Reducer
export const initialState = {
  loading: false,
  error: null,
  users: [],
  streams: []
}

export default function (state = initialState, {type, payload}) {
  const getUpdatesStreamers = (streamer) => {
    const streams = state.streams.concat([payload])
    return Object.assign({}, state, {streams})
  }

  switch (type) {
    case "USERS_LOADING_START":
      return Object.assign({}, state, {loading: true})

    case "USERS_LOADING_SUCCESS":
      return Object.assign({}, state, {loading: false, users: payload})

    case "USERS_LOADING_ERROR":
      return Object.assign({}, state, {loading: false, error: payload})

    case "STREAM_LOADED":
      return getUpdatesStreamers(payload)

    case "STREAM_FAILED":
      return getUpdatesStreamers(payload)

    default:
      return state
  }
}
