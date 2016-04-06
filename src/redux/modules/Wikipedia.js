import reqwest from 'reqwest'
import _ from "lodash"

// Constants
export const REQUEST_WIKI_SEARCH = 'REQUEST_WIKI_SEARCH'
export const WIKI_API = 'https://www.mediawiki.org/w/api.php?action=opensearch&search='

function startRequest (token) {
  return {
    type: "START",
    payload: token
  }
}

function successResponse (response) {
  return {
    type: "SUCCESS",
    payload: response
  }
}

function errorResponse (error) {
  return {
    type: "ERROR",
    payload: error
  }
}

function completeRequest () {
  return {
    type: "COMPLETE"
  }
}

// Thunk
export const searchWiki = (token) => {
  return (dispatch, getState) => {
    dispatch(startRequest(token))
    reqwest({
      url: WIKI_API + token,
      crossOrigin: true,
      type: 'jsonp',
      success: (response) => dispatch(successResponse(response)),
      error: (error) => dispatch(errorResponse(error)),
      complete: () => dispatch(completeRequest(token))
    })
  }
}

function parseOpenSearchResponse ([token, titles, subTitles, links]) {
  return _.times(titles.length - 1, (i) => {
    // all arrays has euqal length
    return {
      title: titles[i],
      subTitle: subTitles[i],
      link: links[i]
    }
  })
}

// Reducer
export const initialState = {
  token: '',
  loading: false,
  loaded: false,
  results: [],
  error: null
}
export default function (state = initialState, {type, payload}) {
  switch (type) {
    case "START":
      return Object.assign({}, state, {
        loading: true,
        token: payload
      })

    case "SUCCESS":
      return Object.assign({}, state, {
        results: parseOpenSearchResponse(payload)
      })

    case "COMPLETE":
      return Object.assign({}, state, {
        loading: false,
        loaded: true
      })

    default:
      return state
  }
}
