import reducer, { initialState } from 'redux/modules/Simon'

describe('(Redux) Simon', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState)
    })
  })
})
