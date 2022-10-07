import { useState } from "react";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(true);
  const [board, setBoard] = useState([
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    "."
  ]);

  const handleClick = (i) => {
    if (board[i] === ".") {
      if (user) {
        setUser(false);
        board[i] = "X";
      } else {
        setUser(true);
        board[i] = "O";
      }
    }
    if (checkWinner()) {
      alert(user ? "Player 1 is Winner!" : "Player 2 is winner!");
      resetBoard();
    }
    else if (checkTie()) {
      alert("It's a Tie!");
      resetBoard();
    }
  };

  // Checks for the win condition in rows
  const checkRow = () => {
    let ans = false;
    for (let i = 0; i < 9; i += 3) {
      if (board[i] === board[i + 1] &&
        board[i] === board[i + 2] &&
        board[i] !== ".") {
        ans = true;
        break;
      }
    }
    return ans;
  }

  // Checks for the win condition in cols
  const checkCol = () => {
    let ans = false;
    for (let i = 0; i < 3; i++) {
      if (board[i] === board[i + 3] &&
        board[i] === board[i + 6] &&
        board[i] !== ".") {
        ans = true;
        break;
      }
    }
    return ans;
  }

  // Checks for diagonals
  const checkDiagonal = () => {
    return ((board[0] === board[4] &&
      board[0] === board[8] && board[0] !== ".") ||
      (board[2] === board[4] && board[2] === board[6] &&
        board[2] !== "."));
  }

  // Checks for winner
  const checkWinner = () => {
    return (checkRow() || checkCol() || checkDiagonal());
  }

  // Checking for a tie
  const checkTie = () => {
    let count = 0;
    board.forEach((cell) => {
      if (cell !== ".") {
        count++;
      }
    })
    return count === 9;
  }

  const resetBoard = () => {
    setBoard([".", ".", ".", ".", ".", ".", ".", ".", "."]);
    setUser(true);
  }

  return (
    <div>
      <div className="Head">
        <h3>Player-1: 'X'</h3><h3>Player-2: 'O'</h3>
      </div>
      <div className="App">
        {board.map((e, i) => (
          <div key={i} onClick={() => handleClick(i)}>
            {e}
          </div>
        ))}
      </div>
      <div className="btn">
      <button onClick={() => resetBoard()}>Reset Board</button>
      </div>
    </div>
  );
}
