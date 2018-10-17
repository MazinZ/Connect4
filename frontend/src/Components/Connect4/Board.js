import React from 'react';
import Connect4Cell from './Cell';
import './styles/Board.css';

const Connect4Board = (props) => {
  const cells = [];
  const { board, colors } = props;

  for (let row = 0; row < board.length; row += 1) {
    for (let col = 0; col < board[row].length; col += 1) {
      const { color } = colors[board[row][col] || 0];
      const cell = <Connect4Cell color={color} i={`${row}-${col}`} key={`${row}-${col}`} />;
      cells.push(cell);
    }
  }

  return (
    <div className="board">
      <div className="grid">
        {cells}
      </div>
    </div>
  );
};

export default Connect4Board;
