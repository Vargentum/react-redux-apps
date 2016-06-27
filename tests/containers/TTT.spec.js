import {
  PLAYERS,
  GRID_SIZE, 
  GRID_LAST_IDX, 
  generateEmptyGrid, 
  makeATurn, 
  isCellAt,
  isWinning,
  generatePossibleMoves, 
  findWinningMove,
  findBestMove
} from 'containers/TTT'

const {X, O} = PLAYERS

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
    expect(moves[0].grid[0][0]).to.be.true
    expect(moves[cellsLength - 1].grid[GRID_SIZE-1][GRID_SIZE-1]).to.be.true
  })
  it(`should return an empty array if no moves available`, () => {
    const drawGrid = [[X,O,O], [O,X,X],[X,X,O]]
    const moves = generatePossibleMoves(drawGrid)
    expect(moves).to.be.empty
  })
});

describe(`isCellAt`, () => {
  const cell1 = {x:0,y:0}
  const cell2 = {x:0,y:1}
  it(`should verify that cell is at Corner of the grid`, () => {
    expect(isCellAt.corner(cell1.x, cell1.y)).to.be.true
  });
  it(`should verify that cell is at Side of the grid`, () => {
    expect(isCellAt.side(cell2.x, cell2.y)).to.be.true
  });
});

describe(`isWinning`, () => {
  const winH = {
    grid: [[X,X,X], [O,O,null], [null,null,null]],
    x: 0,
    y: 0,
    value: X
  }
  const winV = {
    grid: [[X,X,null], [X,O,null], [X,null,null]],
    x: 0,
    y: GRID_LAST_IDX,
    value: X
  }
  const winD = {
    grid: [[X,X,null], [O,X,null], [O,null,X]],
    x: GRID_LAST_IDX,
    y: GRID_LAST_IDX,
    value: X
  }

  it(`should verify all types of wins for Corner cell`, () => {
    [winH, winV, winD].forEach(
      ({grid,x,y,value}) => expect(isWinning.corner(grid,x,y,value)).to.be.true
    )
  });

  it(`should verify vertical and horisontal wins for Side cell`, () => {
    [winH, winV].forEach(
      ({grid,x,y,value}) => expect(isWinning.side(grid,x,y,value)).to.be.true
    )
  });
});

describe(`findWinningMove`, () => {
  const grid = [[X,X,null], [O,O,null], [null,null,null]]
  const winXmove = {
    grid: [[X,X,X], [O,O,null], [null,null,null]],
    move: {x: GRID_LAST_IDX, y: 0}
  }
  const winOmove = {
    grid: [[X,X,null], [O,O,O], [null,null,null]],
    move: {x: GRID_LAST_IDX, y: 1}
  }

  it(`should return new grid and winning cell coords for X`, () => {
    expect(findWinningMove(grid, X)).to.be.eql(winXmove);
    expect(findWinningMove(grid, O)).to.be.eql(winOmove);
  });
});


describe(`findBestMove`, () => {
  const case1 = {
    actual: [[X,X,null], [O,O,null], [null,null,null]],
    expected: {
      grid: [[X,X,X], [O,O,null], [null,null,null]],
      move: {x: GRID_LAST_IDX, y: 0}
    }
  }
  const case2 = {
    actual: [[null,O,null], [null,X,null], [null,null,null]],
    expected: {
      grid: [[X,X,X], [O,O,null], [null,null,null]],
      move: {x: GRID_LAST_IDX, y: 0}
    }
  }

  it(`should find winning move`, () => {
    // expect(findBestMove(case1.actual, X)).to.eql(case1.expected);

    console.log(findBestMove(case2.actual, X).grid)
    // console.log(findBestMove(case2.actual, X).grid)
  });
});

