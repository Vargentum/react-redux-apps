import reducer, { initialState } from 'redux/modules/Wikipedia'

describe('(Redux) Wikipedia', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState)
    })
  })
})
