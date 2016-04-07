import reqwest from 'reqwest'
import _ from "lodash"
import URI from 'urijs'

// Constants
export const REQUEST_WIKI_SEARCH = 'REQUEST_WIKI_SEARCH'
const WIKI_API_ENDPOINT = 'https://www.mediawiki.org/w/api.php?'
const WIKI_LINK_ENDPOINT = 'http://en.wikipedia.org/wiki/'

function buildWikiQuery(token) {
  const query = {
    action: 'query',
    list: 'search',
    srsearch: token,
    srprop: 'snippet|titlesnippet',
    format: 'json'
  }
  return WIKI_API_ENDPOINT + URI.buildQuery(query)
} 

function convertTitleToLink (title) {
  return WIKI_LINK_ENDPOINT + _.snakeCase(title)
}

function augmentResultsWithLinks (results) {
  return results.map((entry) => Object.assign(
    {}, 
    entry, 
    {
      link: convertTitleToLink(entry.title)
    }))
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
        results: augmentResultsWithLinks(payload.query.search)
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
