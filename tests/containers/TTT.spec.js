import _ from 'lodash'

const PLAYERS = {
  X: true,
  O: false
}
const {X, O} = PLAYERS

const GRID_SIZE = 3


const generateEmptyGrid = () => _.times(GRID_SIZE, () => _.times(GRID_SIZE, () => null))

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
  return _.map(emptyIndexes, ({x,y}) => {
    return {newGrid: makeATurn(grid,x,y,value), movedInto: {x,y}}
  })
}

const winBy = {
  horisontal: (grid, x, y, value) => grid[y].every(cell => cell === value),
  vertical:   (grid, x, y, value) => grid.every(row => row[x] === value),
  diagonal:   (grid, x, y, value) => 
    grid.every((row,i) => row[i] === value) || 
    grid.every((row,i) => row[GRID_SIZE - 1 - i] === value)  
}

const isCoordAtCenter = (crd) => crd === (GRID_SIZE - 1) / 2
const isCoordAtCorner = (crd) => crd === 0 || crd === GRID_SIZE - 1
const isCoordAtSide   = (crd) => !isCoordAtCenter(crd) && !isCoordAtCorner(crd)


const isCellAt = {
  // center: (x,y) => isCoordAtCenter(x) && isCoordAtCenter(y), 
  corner: (x,y) => isCoordAtCorner(x) && isCoordAtCorner(y),
  side:   (x,y) => isCoordAtSide(x) && isCoordAtSide(y)
}

const isWinning = {
  side: (...args) => winBy.horisontal(...args) || winBy.vertical(...args),
  corner: (...args) => winBy.horisontal(...args) || winBy.vertical(...args) || winBy.diagonal(...args)
}


const findWinningTurn = (grid, value) => {
  const moves = generatePossibleMoves(grid, value) 
  let winner = false
  moves.forEach(move => {
    const {newGrid, movedInto: {x,y}} = move
    if (winner) return move
    winner = _.cond([
      [isCellAt.corner(x,y), () => isWinning.corner(grid,x,y,value)],
      [isCellAt.side(x,y), () => isWinning.side(grid,x,y,value)]
    ])
  })
}
  

// const turnIsDrawing = () =>
// const getTurnResult = () =>


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
  const grid = generateEmptyGrid()
  const moves = generatePossibleMoves(grid, X)
  const cellsLength = _.flatten(grid).length

  it(`should return a list of all possible moves in array`, () => {
    expect(moves).to.be.an('array')
    expect(moves).to.has.lengthOf(cellsLength)
  });
  it(`every returned list should contain an turn result`, () => {
    expect(moves[0].newGrid[0][0]).to.be.true
    expect(moves[cellsLength - 1].newGrid[GRID_SIZE-1][GRID_SIZE-1]).to.be.true
  })
});

describe(`findWinningTurn`, () => {
  const grid = [[X,X,null], [O,O,null], [null,null,null]]
  console.log(findWinningTurn(grid, X))

  it(`should return new grid and winning cell coords for X`, () => {
    expect(findWinningTurn(grid, X)).to.be.ok;
    expect(findWinningTurn(grid, O)).to.be.ok;
  });
});