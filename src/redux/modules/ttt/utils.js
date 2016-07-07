import _ from 'lodash'

export const SYMBOLS = {
  X: true,
  O: false
}
export const GRID_SIZE = 3
export const GRID_LAST_IDX = GRID_SIZE - 1


export class Cell {
  constructor(x,y,value = null) {
    this.x = x
    this.y = y
    this.value = value
  }
  isEmpty() {
    return this.value === null
  }
  getCoords() {
    return {x: this.x, y: this.y}
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

export const makeATurn = (grid, x, y, value) => 
  _.set(_.cloneDeep(grid), `${y}.${x}`, new Cell(x, y, value))

export const generatePossibleMoves = (grid, value) => {
  return _.map(getEmptyCells(grid), (Cell) => {
    const coords = Cell.getCoords()
    return {
      grid: makeATurn(grid, coords.x, coords.y , value),
      move: coords
    }
  })
}

const winBy = {
  horisontal: (grid, x, y, value) => grid[y].every(cell => cell === value),
  vertical:   (grid, x, y, value) => grid.every(row => row[x] === value),
  diagonal:   (grid, x, y, value) =>
    grid.every((row,i) => row[i] === value) ||
    grid.every((row,i) => row[GRID_LAST_IDX - i] === value)
}

const filterBy = {
  horisontal: (grid, x, y, value) => grid[y].filter(cell => cell === value),
  vertical:   (grid, x, y, value) => grid.filter(row => row[x] === value),
  d1:   (grid, x, y, value) => grid.filter((row,i) => row[i] === value),
  d2:   (grid, x, y, value) => grid.filter((row,i) => row[GRID_LAST_IDX - i] === value)
}

const isCoordAtCenter = (crd) => crd === (GRID_LAST_IDX) / 2
const isCoordAtCorner = (crd) => crd === 0 || crd === GRID_LAST_IDX

export const createRandomMove = (grid, value) => {
  const moves = generatePossibleMoves(grid, value)
  const idx = _.random(0, moves.length - 1)
  return moves[idx]
}

export const isCellAt = {
  // center: (x,y) => isCoordAtCenter(x) && isCoordAtCenter(y),
  corner: (x,y) => isCoordAtCorner(x) && isCoordAtCorner(y),
  side:   (x,y) =>
    (isCoordAtCorner(x) && isCoordAtCenter(y)) ||
    (isCoordAtCorner(y) && isCoordAtCenter(x))
}

export const isWinning = {
  side: (...args) => winBy.horisontal(...args) || winBy.vertical(...args),
  corner: (...args) =>  winBy.horisontal(...args) || winBy.vertical(...args) || winBy.diagonal(...args)
}

export const isWinningMove = ({grid, move: {x,y}}, value) =>
  (isCellAt.corner(x,y) && isWinning.corner(grid,x,y,value))
  ||
  (isCellAt.side(x,y) && isWinning.side(grid,x,y,value))



/*turn => gameOver()? 
  -> win => highlightWinnedMoves => updateScore => resetGame
  -> draw => updateScore => resetGame
*/


/*
finishGame => updateScore => resetGame

turn => isWinningTurn() ?
  -> higlightWinningCells => finishGame
  -> isADraw() ?
    -> finishGame
    -> ready for next turn

*/

export const getWinningCells = ({grid, move: {x,y}}, value) => {
  let possibleArrays = []
  console.log(filterBy.horisontal(grid, x, y, value))
  console.log(filterBy.vertical(grid, x, y, value))
  console.log(filterBy.d1(grid, x, y, value))
  console.log(filterBy.d2(grid, x, y, value))
  possibleArrays.push(filterBy.horisontal(grid, x, y, value))
  possibleArrays.push(filterBy.vertical(grid, x, y, value))
  if (!isCellAt.corner(x,y)) {
    possibleArrays.push(filterBy.d1(grid, x, y, value))  
    possibleArrays.push(filterBy.d2(grid, x, y, value))  
  }
  // TypeError with Array.prorotype.find
  return _.find(possibleArrays, (ary) => ary.length === GRID_SIZE)
}

/*
winningMove => get
  - row with it
  - `col` with it
  - 2 diagonals with it

*/








/*
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