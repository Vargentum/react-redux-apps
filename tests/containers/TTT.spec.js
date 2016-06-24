const expect = chai.expect

import _ from 'lodash'


const generateEmptyGrid = (size = 3) => _.times(size, () => _.times(size, () => null))

const makeATurn = (grid, x, y, val) => _.set(grid, `${y-1}${x-1}`, val) //from array to cartesian util?

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
  const emptyIndexes = getEmptyFieldsIndexes(grid)
  const grids = 1
}


describe('generateEmptyGrid', () => {

  it('should return a List of Lists', () => {
    expect(generateEmptyGrid()).to.has.length
    expect(generateEmptyGrid()[0]).to.has.length
  })
  console.log(generateEmptyGrid(4))
  it('generate 2 level deep `square` array', () => {
    expect(generateEmptyGrid()).to.has.lengthOf(3)
    expect(_.flatten(generateEmptyGrid())).to.has.lengthOf(3*3)
  })
})

// describe('makeATurn', () => {
//   const grid = generateEmptyGrid()
//   const grid1 = makeATurn(grid,2,2,true)
//   const grid2 = makeATurn(grid1,3,3,false)

//   it('should place a value into Cartesizen-like grid', () => {
//     expect(grid1.flatten().get(4)).to.be.true
//     expect(grid2.flatten().get(8)).to.be.false
//   })
// })
