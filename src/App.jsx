import { useState } from "react";
import "./App.css";

const initialValue = () => Array(9).fill(null);
function App() {
  const [board, setBoard] = useState(initialValue);
  const [isXTurn, setXTurn] = useState(true);
  const WinningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ];
  const calculateWinner = (currentBoard) => {
    for (let i = 0; i < WinningPattern.length; i++) {
      const [a, b, c] = WinningPattern[i];
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }
    return null;
  };
  const handleClick = (index) => {
    const winner = calculateWinner(board);
    if (winner || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setXTurn(!isXTurn);
  };
  const getStatusMessage = () => {
    const winner = calculateWinner(board);
    if (winner) return `Players ${winner} Won!`;
    if (!board.includes(null)) return "It's a Draw!";
    return `Player ${isXTurn ? "X" : "O"} Turn`;
  };
  const resetGameLogic = () => {
    setBoard(initialValue());
    setXTurn(true);
  };
  console.log(board);
  return (
    <div className="game">
      <div className="status">
        ({getStatusMessage()})<button onClick={resetGameLogic}>RESET</button>
      </div>
      <div className="board">
        {board.map((board, index) => {
          return (
            <button
              key={index}
              onClick={() => handleClick(index)}
              disabled={board !== null}
              className="board-btn"
            >
              {board}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
