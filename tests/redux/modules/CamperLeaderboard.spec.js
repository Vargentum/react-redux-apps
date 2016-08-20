import reducer, { initialState } from 'redux/modules/CamperLeaderboard'

describe('(Redux) CamperLeaderboard', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState)
    })
  })
})
