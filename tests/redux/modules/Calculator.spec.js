import reducer, { initialState, AddableNumber, Queque, OPERATORS } from 'redux/modules/Calculator'

describe('(Redux) Calculator', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState)
    })
  })
})

describe(`AddableNumber`, () => {
  const number = new AddableNumber()
  it('Should correctly concat numbers and return an integer', () => {
    expect(number.getValue()).to.eql(0)
    expect(number.add(5).getValue()).to.eql(5)
    expect(number.add(4).add(25).getValue()).to.eql(5425)
  })
  it('Should correctly switchValueSign from positive to negative and vice vera', () => {
    expect(number.switchValueSign().getValue()).to.eql(-5425)
    expect(number.switchValueSign().getValue()).to.eql(5425)
  })
  // it('Should correctly change value to float and vice vera', () => {
    // expect(number.switchFloatingPoint().getValue()).to.eql(-5425.0)
    // expect(number.switchFloatingPoint().getValue()).to.eql(5425)
  // })
})

describe(`Queque`, () => {
  const [add, substract, multiple, divide] = Object.keys(OPERATORS)
  const queque = new Queque()
  it('Should add and substract numbers', () => {
    expect(queque.reset().add(5).add(add).add(5).getResult()).to.eql(5 + 5)
    expect(queque.add(substract).add(5).getResult()).to.eql(10 - 5)
    expect(queque.add(substract).add(5).getResult()).to.eql(5 - 5)
    expect(queque.add(add).add(55).getResult()).to.eql(55)
  })
  it('Should multiply and divide numbers', () => {
    expect(queque.reset().add(5).add(multiple).add(5).getResult()).to.eql(5 * 5)
    expect(queque.add(divide).add(5).getResult()).to.eql(25 / 5)
  })
  it('Should calculate with rules of priority', () => {
    expect(queque.reset().add(5)
      .add(add).add(5)
      .add(multiple).add(3)
      .add(substract).add(5)
      .add(divide).add(5)
      .add(substract).add(5)
      .add(multiple).add(3)
      .getResult()).to.eql(5 + 5 * 3 - 5 / 5 - 5 * 3)
  })
})
