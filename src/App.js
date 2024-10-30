import React, { useState } from 'react';
import './App.css';
import {checkWin, findBestMove} from "./Calculator";
import RenderSquare from "./RenderSquare";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerX, setIsPlayerX] = useState(true);

  const winner = checkWin(board);
  const status = winner
      ? `Winner: ${winner}`
      : `Next player: ${isPlayerX ? 'X' : 'O'}`;


  const handleClick = (index) => {
    if (board[index] || checkWin(board)) return;

    const newBoard = board.slice();
    newBoard[index] = 'X';
    setBoard(newBoard);

    if (checkWin(newBoard) || newBoard.every(cell => cell)) return;

    const aiMove = findBestMove(newBoard);
    newBoard[aiMove] = 'O';
    setBoard(newBoard);
  };



  return (
      <div className="game">
        <div className="status">{status}</div>
        <div className="board">
          {[0, 1, 2].map(row =>
              <div key={row} className="board-row">
                {<RenderSquare index={row * 3} handleClick={handleClick} board={board} />}
                {<RenderSquare index={row * 3 + 1} handleClick={handleClick} board={board} />}
                {<RenderSquare index={row * 3 + 2} handleClick={handleClick} board={board} />}
              </div>
          )}
        </div>
      </div>
  );
};

export default App;
