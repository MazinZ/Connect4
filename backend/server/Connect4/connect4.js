function Connect4Board(rows, cols) {
  let count = 0;
  const board = [];
  const size = {
    rows,
    cols,
  };

  (function init() {
    for (let i = 0; i < rows; i++) {
      board.push([]);
      for (let j = 0; j < cols; j++) {
        board[i].push(null);
      }
    }
  }());

  return {
    checkDraw,
    checkWin,
    play,
    board,
  };

  function play(symbol, col) {
    const valid = nearestValidRow(col);
    if (valid !== null) {
      count += 1;
      board[valid][col] = symbol;
      return valid;
    }

    return null;
  }

  function checkDraw() {
    return count === size.rows * size.cols;
  }

  function checkWin(row, col, player) {
    const paths = [];
    const condition = ''.padStart(4, player);

    horizontal();
    vertical();
    forwardDiag();
    backDiag();

    const win = paths.some((path) => { 
      return path.join('').map(pos => +pos)
        .indexOf(condition) !== -1;
    });

    return win;

    function horizontal() {
      paths.push(board[row]);
    }

    function vertical() {
      const column = [];
      for (let i = 0; i < size.rows; i += 1) {
        column.push(board[i][col]);
      }
      paths.push(column);
    }

    function forwardDiag () {
      const diag = [];
      let i = row - 1;
      let j = col - 1;
      while (i >= 0 && j >= 0) {
        diag.unshift(board[i][j]);
        i -= 1;
        j += 1;
      }
      i = row;
      j = col;
      while (i < size.rows && j < size.cols) {
        diag.push(board[i][j]);
        i += 1;
        j += 1;
      }
      paths.push(diag);
    }

    function backDiag() {
      const diag = [];
      let i = row + 1;
      let j = col - 1;
      while (i < size.rows && j >= 0) {
        diag.unshift(board[i][j]);
        i += 1;
        j -= 1;
      }
      i = row;
      j = col;
      while (i >= 0 && j < size.cols) {
        diag.push(board[i][j]);
        i -= 1;
        j += 1;
      }
      paths.push(diag);
    }
  }

  function nearestValidRow(col) {
    let row = 0;
    let valid = null;
    if (col >= size.cols) {
      return null;
    }
    while (row < size.rows && board[row][col] === null) {
      valid = row;
      row += 1;
    }
    return valid;
  }
}

module.exports = Connect4Board;
