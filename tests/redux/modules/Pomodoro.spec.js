import reducer, { initialState } from 'redux/modules/Pomodoro'

describe('(Redux) Pomodoro', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState)
    })
  })
})
