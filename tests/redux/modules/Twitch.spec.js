import reducer, { initialState } from 'redux/modules/Twitch'

describe('(Redux) Twitch', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState)
    })
  })
})
