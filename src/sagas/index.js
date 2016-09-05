import {watchRecent, watchAlltime} from './CamperLeaderboard'
import {fork} from 'redux-saga/effects'


export default function *rootSaga() {
  yield fork(watchRecent)
  yield fork(watchAlltime)
}
