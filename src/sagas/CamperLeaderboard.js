import reqwest from 'reqwest'
import * as efc from 'redux-saga/effects'
import {takeEvery, takeLatest, delay} from 'redux-saga'
import * as duck from 'redux/modules/CamperLeaderboard'

const {FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_FAIL} = duck

export function *saga () {
  const data = yield reqwest('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
  yield efc.put({
    type: FETCH_DATA_SUCCESS,
    payload: {data}
  })
}

export function *watcher () {
  yield *takeEvery(FETCH_DATA, saga)
}
