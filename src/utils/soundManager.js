import _ from 'lodash'
import SoundEffectManager from 'sound-effect-manager'
const SEM = new SoundEffectManager()

const utils = {
  loadSound: (path, name) => SEM.loadFile(path, name),
  toKeys: (v,k) => k
}

/* -----------------------------
  Simon game sounds
----------------------------- */
const _SimonSounds = {
  error: '/simon/error.mp3',
  success: '/simon/success.mp3',
  levelComplete: '/simon/nextLevel.mp3'
}
export const SimonSounds = _.mapValues(_SimonSounds, utils.toKeys)

/* -----------------------------
  Load all sounds
----------------------------- */
_.forEach(_SimonSounds, utils.loadSound)

export default SEM
