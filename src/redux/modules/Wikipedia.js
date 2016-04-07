import reqwest from 'reqwest'
import _ from "lodash"
import URI from 'urijs'

// Constants
export const REQUEST_WIKI_SEARCH = 'REQUEST_WIKI_SEARCH'
const WIKI_API_ENDPOINT = 'https://en.wikipedia.org/w/api.php?'
export const WIKI_RANDOM_ARTICLE_URL = 'http://en.wikipedia.org/wiki/Special:Random'

function buildWikiQuery(token) {
  const query = {
    action: 'query',
    list: 'search',
    srsearch: token,
    srprop: 'snippet|titlesnippet',
    format: 'json',
    generator: 'search',
    gsrsearch: token,
    prop: 'info',
    inprop: 'url'
  }
  return WIKI_API_ENDPOINT + URI.buildQuery(query)
} 


function parseWikiResponse ({query: {pages, search}}) {
  const pagesSortedArray = _.toArray(pages).sort((a,b) => a.index - b.index)
  return search.map((item, idx) => Object.assign({}, item, pagesSortedArray[idx]))
}

function startRequest () {
  return {
    type: "START"
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
      url: buildWikiQuery(token),
      crossOrigin: true,
      type: 'jsonp',
      success: (response) => dispatch(successResponse(response)),
      error: (error) => dispatch(errorResponse(error)),
      complete: () => dispatch(completeRequest(token))
    })
  }
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
        loading: true
      })

    case "SUCCESS":
      return Object.assign({}, state, {
        results: parseWikiResponse(payload)
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
