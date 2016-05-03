import reqwest from 'reqwest'
import _ from 'lodash'

const ASYNC_STAGES = {
  start: '_LOAD_START',
  success: '_LOAD_SUCCESS',
  error: '_LOAD_ERROR'
}

const DATA_URL = {
  questions: '/gardenize/questions.json',
  answers: '/gardenize/answers.json'
}


export const getResource = (type, onSuccess, onFail) => {
  if (!DATA_URL[type]) throw new Error(`No such resource: ${type}`)
  reqwest({
    url: DATA_URL[type],
    method: 'get',
    type: 'json',
    success: onSuccess,
    error: onFail
  })
}

// load & process resource
export const asyncRequest = (config, fn) =>
  (dispatch, getState) => {
    dispatch({
      type: config.event + ASYNC_STAGES.start
    })
    getResource(
      config.resource,
      (response) => dispatch({
        type: config.event + ASYNC_STAGES.success,
        payload: fn && _.isFunction(fn) ? fn(response) : response
      }),
      (error) => dispatch({
        type: config.event + ASYNC_STAGES.error,
        payload: error
      }))
  }

const existy = x => x != null

const generateNextId = (ary) => {
  if (existy(_.last(ary) && _.last(ary).id)) {
    return _.last(ary).id + 1
  }
}

export const createQuestionEntry = (questions, data) => Object.assign(
  {},
  data,
  {
    id: generateNextId(questions),
    answers: [],
    rating: 0
  }
)

export const postEntryAsFirst = (table, entry) => [entry].concat(table)




