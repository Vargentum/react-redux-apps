import _ from 'lodash'

export const SYMBOLS = {
  X: true,
  O: false
}
export const GRID_SIZE = 3
export const GRID_LAST_IDX = GRID_SIZE - 1

export class Cell {
  constructor(x,y,value = null) {
    this.coords = {x, y}
    this.value = value
    this.isWinning = false
  }
  isEmpty() {
    return this.value === null
  }
}

const mapGridCells = (grid, fn) => _.flatten(
  grid.map((row, y) =>
    row.map((Cell, x) => fn(Cell)))
)

const getEmptyCells = (grid) => 
  mapGridCells(grid, _.identity).filter((Cell) => Cell.isEmpty())

export const generateEmptyGrid = () => 
  _.times(GRID_SIZE, (x) => 
    _.times(GRID_SIZE, (y) => new Cell(x,y,null)))

export const generateDefinedGrid = ([r1,r2,r3]) => ([
  [new Cell(0,0,r1[0]), new Cell(1,0,r1[1]), new Cell(2,0,r1[2])],
  [new Cell(0,1,r2[0]), new Cell(1,1,r2[1]), new Cell(2,1,r2[2])],
  [new Cell(0,2,r3[0]), new Cell(1,2,r3[1]), new Cell(2,2,r3[2])]
])

export const makeATurn = (grid, x, y, value) => 
  _.set(_.cloneDeep(grid), `${x}.${y}`, new Cell(x, y, value))

export const generatePossibleMoves = (grid, value) => {
  return _.map(getEmptyCells(grid), (Cell) => {
    return {
      grid: makeATurn(grid, Cell.coords.x, Cell.coords.y , value),
      move: Cell.coords
    }
  })
}

export const createRandomMove = (grid, value) => {
  const moves = generatePossibleMoves(grid, value)
  const idx = _.random(0, moves.length - 1)
  return moves[idx]
}

export const findWinRow = (grid, value) => {
  const flatCells = mapGridCells(grid, _.identity).filter(Cell => Cell.value === value)
  const secX = _.groupBy(flatCells, Cell => Cell.coords.y)
  const secY = _.groupBy(flatCells, Cell => Cell.coords.x)
  const secD = {0: _.filter(flatCells, Cell => Cell.coords.x === Cell.coords.y)}

  const findWinInSec = (sec) => _.find(sec, (group) => group.length === GRID_SIZE)
  const reduceSecToWin = (p,sec) => findWinInSec(sec) || p
  return _.reduce([secX,secY,secD], reduceSecToWin, undefined)
}

export const highlightWinRow = (grid, winRow) => {
  const newGrid = _.cloneDeep(grid)
  winRow.forEach((Cell) => {
    const gridCell = newGrid[Cell.coords.x][Cell.coords.y]
    gridCell.isWinning = true
  })
  return newGrid
}


export class ScoreTable {
  static entry = {
    win: 0,
    lose: 0,
    draw: 0
  }
  constructor(args) {
    this.player = _.clone(ScoreTable.entry)
    this.opponent = _.clone(ScoreTable.entry)
  }
}


/*

WORKS UNDER AI

export const findWinningMove = (grid, value) => {
  const moves = generatePossibleMoves(grid, value)
  let win = null
  moves.forEach(move => {
    if (win) return
    if (isWinningMove(move, value)) {
      win = move
    }
  })
  return win
}

export const minMax = (player, origPlayer, scores, isWin, origIdx, origAry) => (move, crtIdx, crtAry) => {
  const moves = generatePossibleMoves(move.grid, player)
  const opponent = !player
  const [idx, ary] = [origIdx || crtIdx, origAry || crtAry]
  if (!moves.length || isWin) {
    return
  }
  else if (isWinningMove(move, player)) {
    debugger
    isWin = true
    if (player === origPlayer) {
      // console.log(move.grid, ary[idx].grid, '\n')
      scores[idx] = {value: 1, move: ary[idx]}
    } else {
      scores[idx] = {value: -1, move: ary[idx]}
    }
  }
  moves.forEach(minMax(opponent, origPlayer, scores, isWin, idx, ary))
}

export const findBestMove = (grid, player) => {
  const scores = []
  const moves = generatePossibleMoves(grid, player)
  moves.forEach(minMax(player, player, scores, false))
  scores.forEach(score => console.log(score.value))
  return scores.sort((a,b) => a.value - b.value)[0].move
}
*/