import reqwest from 'reqwest'
import * as efc from 'redux-saga/effects'
import {takeEvery, takeLatest, delay} from 'redux-saga'
import {
  FETCH_LOADING,
  FETCH_RECENT, FETCH_RECENT_SUCCESS, FETCH_RECENT_FAIL,
  FETCH_ALLTIME, FETCH_ALLTIME_SUCCESS, FETCH_ALLTIME_FAIL} from 'redux/modules/CamperLeaderboard'


export function *sagaRecent () {
  yield efc.put({
    type: FETCH_LOADING
  })
  const data = yield reqwest('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
  yield efc.put({
    type: FETCH_RECENT_SUCCESS,
    payload: {data}
  })
  // catch(error) {
  //   yield efc.put({
  //     type: FETCH_RECENT_FAIL,
  //     payload: {error}
  //   })
  // }
}
export function *sagaAllTime () {
  yield efc.put({
    type: FETCH_LOADING
  })
  const data = yield reqwest('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
  yield efc.put({
    type: FETCH_ALLTIME_SUCCESS,
    payload: {data}
  })
  // catch(error) {
  //   yield efc.put({
  //     type: FETCH_ALLTIME_FAIL,
  //     payload: {error}
  //   })
  // }
}

export function *watchRecent () {
  yield *takeEvery(FETCH_RECENT, sagaRecent)
}
export function *watchAlltime () {
  yield *takeEvery(FETCH_ALLTIME, sagaAllTime)
}
