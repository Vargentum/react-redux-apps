const expect = chai.expect
import _ from 'lodash'


const PLAYERS = {
  X: true,
  O: false
}
const {X, O} = PLAYERS



const generateEmptyGrid = (size = 3) => _.times(size, () => _.times(size, () => null))

const makeATurn = (grid, x, y, val) => _.set(_.cloneDeep(grid), `${y}.${x}`, val)

const isCellEmpty = cell => cell === null

const mapGridCells = (grid, fn) => 
  grid.map((row, y) => 
    row.map((cell, x) => fn(cell, x, y)))

const getEmptyCellsCoords = (grid) => {
  const coords = []
  mapGridCells(grid, (cell,x,y) => {
    if (!isCellEmpty(cell)) return 
    else coords.push({x,y})
  })
  return coords
}

const generatePossibleMoves = (grid, value) => {
  const emptyIndexes = getEmptyCellsCoords(grid)
  return _.map(emptyIndexes,({x,y}) => makeATurn(grid,x,y,value))
}


describe('generateEmptyGrid', () => {

  it('should return a Array of Arrays', () => {
    expect(generateEmptyGrid()).to.has.length
    expect(generateEmptyGrid()[0]).to.has.length
  })
  it('generate 2 level deep `square` array', () => {
    expect(generateEmptyGrid()).to.has.lengthOf(3)
    expect(_.flatten(generateEmptyGrid())).to.has.lengthOf(3*3)
  })
})

describe('makeATurn', () => {
  const grid = generateEmptyGrid()
  const grid1 = makeATurn(grid,1,1,true)
  const grid2 = makeATurn(grid1,2,2,false)

  it('should place a value into Cartesizen-like grid', () => {
    expect(_.get(grid1, `${1}.${1}`)).to.be.true
    expect(_.get(grid2, `${2}.${2}`)).to.be.false
  })
  it("shouldn't mutate the passed grid", () => {
    expect(_.get(grid, `${1}.${1}`)).to.be.null
    expect(_.get(grid1, `${2}.${2}`)).to.be.null
  })
})

describe(`generatePossibleMoves`, () => {
  const gridSize = 3
  const grid = generateEmptyGrid(gridSize)
  const moves = generatePossibleMoves(grid, X)
  const cellsLength = _.flatten(grid).length

  it(`should return a list of all possible moves in array`, () => {
    expect(moves).to.be.an('array')
    expect(moves).to.has.lengthOf(cellsLength)
  });
  it(`every returned list should contain an turn result`, () => {
    expect(moves[0][0][0]).to.be.true
    expect(moves[cellsLength - 1][gridSize-1][gridSize-1]).to.be.true
  })
});
