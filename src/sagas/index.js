import {watcher as camperLeaderboardWatcher} from './CamperLeaderboard'


export default function *rootSaga() {
  yield [
    camperLeaderboardWatcher()
  ]
}
