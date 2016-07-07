import {
  SYMBOLS,
  GRID_SIZE, 
  GRID_LAST_IDX, 
  Cell,
  generateEmptyGrid, 
  makeATurn, 
  isCellAt,
  isWinning,
  isWinningMove,
  generatePossibleMoves, 
  getWinningCells
} from 'redux/modules/ttt/utils'

const {X, O} = SYMBOLS

describe('generateEmptyGrid', () => {

  it('should return a Array of Arrays', () => {
    expect(generateEmptyGrid()).to.has.length
    expect(generateEmptyGrid()[0]).to.has.length
  })
  it('generate 2 <leve></leve>l deep `square` array', () => {
    expect(generateEmptyGrid()).to.has.lengthOf(3)
    expect(_.flatten(generateEmptyGrid())).to.has.lengthOf(3*3)
  })
})

describe('makeATurn', () => {
  const grid = generateEmptyGrid()
  const grid1 = makeATurn(grid,1,1,X)
  const grid2 = makeATurn(grid1,2,2,O)

  it('should place a value into Cartesizen-like grid', () => {
    expect(_.get(grid1, `${1}.${1}`)).to.eql(new Cell(1,1,X))
    expect(_.get(grid2, `${2}.${2}`)).to.eql(new Cell(2,2,O))
  })
  it("shouldn't mutate the passed grid", () => {
    expect(_.get(grid, `${1}.${1}`)).to.eql(new Cell(1,1,null))
    expect(_.get(grid1, `${2}.${2}`)).to.eql(new Cell(2,2,null))
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
    expect(moves[0].grid[0][0]).to.eql(new Cell(0,0, X))
    expect(moves[cellsLength - 1].grid[GRID_SIZE-1][GRID_SIZE-1]).to.eql(new Cell(GRID_SIZE-1,GRID_SIZE-1, X))
  })
  it(`should return an empty array if no moves available`, () => {
    const drawGrid = [
      [new Cell(0,0,X), new Cell(1,0,O), new Cell(2,0,O)], 
      [new Cell(0,1,O), new Cell(1,1,X), new Cell(2,1,X)], 
      [new Cell(0,2,X), new Cell(1,2,X), new Cell(2,2,O)]
    ]
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

describe(`isWinningMove`, () => {
  it(`should check if this move is winning`, () => {
    expect().to;
  });
});

describe(`getWinningCells`, () => {
  const win = {
    game: {
      grid: [[X,X,X], [O,O,null], [null,null,null]],
      move: {x: 0, y:0},
    },
    value: X
  }
  const expected = getWinningCells(win.game, win.value)

  it(`should return array of objects`, () => {
    expect(expected).to.be.an('array')
  });
  it(`result should has proper length`, () => {
    expect(expected).to.have.length(GRID_SIZE)
  });
  it(`should return coordinates of winning cells `, () => {
    console.log(expected)
    expect(expected).to.eql([
      {x: 0, y: 0},
      {x: 1, y: 0},
      {x: 2, y: 0}
    ])
  });
});












/*

WORKS UNDER AI


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
    actual: [[O,O,null], [null,X,null], [null,null,null]],
    expected: {
      grid: [[O,O,X], [null,X,null], [null,null,null]],
      move: {x: GRID_LAST_IDX, y: 0}
    }
  }

  // it(`should find winning move`, () => {
    // expect(findBestMove(case1.actual, X)).to.eql(case1.expected);
  // });

  it(`should avoid losing moves`, () => {
    expect(findBestMove(case2.actual, X)).to.eql(case2.expected);
    
    // const a = findBestMove(case2.actual, X).grid
    // const a1 = findBestMove(a, O).grid
    // console.log(a, a1)
  });
});

*/