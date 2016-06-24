/*import {Map, List, Repeat} from 'immutable'
import chai from 'chai'
import chaiImmutable from 'chai-immutable'
chai.use(chaiImmutable)

const expect = chai.expect


// const generateGrid = (size = 3) => 
//   Repeat(Repeat(null, size).toList(), size).toList()

// const doMove = (grid, x, y, val) => 
//   grid.setIn([y-1, x-1], val)

// const isCellEmpty = cell => cell === null

// const mapGridCells = (grid, fn) => grid.map((row, y) => row.map((cell, x) => fn(cell, x, y))).flatten()

// const getFlatCells = (grid) => mapGridCells(grid, (cell,x,y) => List.of(cell,x,y))
// const getEmptyCellsIndexes = (grid) => getFlatCells(grid)
//   .filter((item) => isCellEmpty())
//   .map((item))

// const getFieldsIndexes = (grid, checker) => 
//   grid.flatten().reduce((p,n,i) => 
//     checker(n) 
//       ? p.push(n)
//       : p
//   )

const getEmptyFieldsIndexes = (grid) => getFieldsIndexes(grid, isCellEmpty)

const generatePossibleMoves = (grid, value) => {
  const emptyIndexes = getEmptyFieldsIndexes(grid)
  const grids = 

  // grid.map(row => row.map(cell => cell ? value : cell)).toSeq()

}

//List of Grids


describe('generateGrid', () => {

  it('should return a List of Lists', () => {
    expect(List.isList(generateGrid())).to.be.true
    expect(List.isList(generateGrid().get(0))).to.be.true
  })
  it('generate 2 level deep `square` array', () => {
    expect(generateGrid().flatten().toArray()).to.have.lengthOf(3*3)
    expect(generateGrid(4).flatten().toArray()).to.have.lengthOf(4*4)
  })
})

describe('doMove', () => {
  const grid = generateGrid()
  const grid1 = doMove(grid,2,2,true)
  const grid2 = doMove(grid1,3,3,false)

  it('should place a value into Cartesizen-like grid', () => {
    expect(grid1.flatten().get(4)).to.be.true
    expect(grid2.flatten().get(8)).to.be.false
    console.log(groupFieldsBy(grid2,isCellEmpty))
  })
})
*/