import reducer, { initialState } from 'redux/modules/Counter1'

describe('(Redux) Counter1', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState)
    })
  })
})
