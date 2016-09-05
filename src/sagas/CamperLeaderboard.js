import reqwest from 'reqwest'
import * as efc from 'redux-saga/effects'
import {takeEvery, takeLatest, delay} from 'redux-saga'
import {
  FETCH_LOADING, FETCH_FAIL,
  FETCH_RECENT, FETCH_RECENT_SUCCESS,
  FETCH_ALLTIME, FETCH_ALLTIME_SUCCESS} from 'redux/modules/CamperLeaderboard'

function sagaFactory (successMsg, url) {
  return function *_saga () {
    yield efc.put({
      type: FETCH_LOADING
    })
    try {
      const data = yield reqwest(url)
      yield efc.put({
        type: successMsg,
        payload: {data}
      })
    } catch (error) {
      yield efc.put({
        type: FETCH_FAIL,
        payload: {error}
      })
    }
  }
}

function sagaRecent () {
  return sagaFactory(
    FETCH_RECENT_SUCCESS,
    'https://fcctop100.herokuapp.com/api/fccusers/top/recent'
  )
}

function sagaAllTime () {
  return sagaFactory(
    FETCH_ALLTIME_SUCCESS,
    'https://fcctop100.herokuapp.com/api/fccusers/top/alltime'
  )
}

export function *watchRecent () {
  yield * takeEvery(FETCH_RECENT, sagaRecent())
}
export function *watchAlltime () {
  yield * takeEvery(FETCH_ALLTIME, sagaAllTime())
}
