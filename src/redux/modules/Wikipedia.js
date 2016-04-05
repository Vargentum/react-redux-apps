import reqwest from 'reqwest'

// Constants
export const REQUEST_WIKI_SEARCH = 'REQUEST_WIKI_SEARCH'
export const WIKI_API = 'https://www.mediawiki.org/w/api.php?action=opensearch&search='

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

function completeRequest (token) {
  return {
    type: "COMPLETE",
    payload: token
  }
}

// Thunk
export const searchWiki = (token) => {
  return (dispatch, getState) => {
    console.log('search-wiki')

    if (!token.length) return

    dispatch(startRequest())

    reqwest({
      url: WIKI_API + token,
      crossOrigin: true,
      type: 'jsonp',
      success: (response) => dispatch(successResponse(response)),
      error: (error) => dispatch(errorResponse(error)),
      complete: () => dispatch(completeRequest(token))
    })

    // return new Promise((resolve) => {
    //   dispatch(increment(getState().counter))
    //   resolve()
    // })
  }
}

// Reducer
export const initialState = {
  loading: false,
  response: [],
  error: null
}
export default function (state = initialState, {type, payload}) {
  switch (type) {
    case "START": 
      return Object.assign({}, state, {
        response: payload,
        loading: true
      })

    case "SUCCESS":
      return Object.assign({}, state, {
        response: payload
      })

    case "COMPLETE":
      return Object.assign({}, state, {
        token: payload,
        loading: false
      })

    default:
      return state
  }
}
