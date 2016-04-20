import reducer, { initialState } from 'redux/modules/Calculator'

describe('(Redux) Calculator', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState)
    })
  })
})
