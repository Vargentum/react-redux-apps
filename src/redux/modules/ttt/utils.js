import _ from 'lodash'

export const SYMBOLS = {
  X: true,
  O: false
}
export const GRID_SIZE = 3
export const GRID_LAST_IDX = GRID_SIZE - 1



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

export const toReadableGrid = (grid) => {
  const readable = mapGridCells(grid, (cell) => {
    switch (cell) {
      case true: return 'X'
      case false: return 'O'
      case null: return '-'
    }
  })
  return readable.join('\n')
}

export const generateEmptyGrid = () => _.times(GRID_SIZE, () => _.times(GRID_SIZE, () => null))

export const makeATurn = (grid, x, y, val) => _.set(_.cloneDeep(grid), `${y}.${x}`, val)

export const generatePossibleMoves = (grid, value) => {
  const emptyIndexes = getEmptyCellsCoords(grid)
  return _.map(emptyIndexes, ({x,y}) => {
    return {grid: makeATurn(grid,x,y,value), move: {x,y}}
  })
}

const winBy = {
  horisontal: (grid, x, y, value) => grid[y].every(cell => cell === value),
  vertical:   (grid, x, y, value) => grid.every(row => row[x] === value),
  diagonal:   (grid, x, y, value) =>
    grid.every((row,i) => row[i] === value) ||
    grid.every((row,i) => row[GRID_LAST_IDX - i] === value)
}

const isCoordAtCenter = (crd) => crd === (GRID_LAST_IDX) / 2
const isCoordAtCorner = (crd) => crd === 0 || crd === GRID_LAST_IDX

export const createRandomMove = (grid, value) => {
  const moves = generatePossibleMoves(grid, value)
  const idx = _.random(0, moves.length - 1)
  return moves[idx]
}

export const isGameOver = (grid) => {
      
}


// export const minMax = (game) => {
//   if (isGameOver) return //score from X perspective
//   let moves = []
//   let scores = []
//   const moves = generatePossibleMoves(game)
//   const winner = isGameOver(game)

//   moves.forEach(move => {
    


//   })

//   if (winner && winner === player) {

//   }
// }


/*export const isCellAt = {
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