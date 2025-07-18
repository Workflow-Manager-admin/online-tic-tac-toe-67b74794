import React, { useState } from "react";
import "./TicTacToe.css";

/**
 * PUBLIC_INTERFACE
 * Main component for the Tic Tac Toe game.
 * Implements all game functions (turns, win/draw detection, restarting, display).
 */
function TicTacToe() {
  // Game state: 3x3 board, 'X' or 'O', status, etc.
  const emptyBoard = Array(9).fill(null);
  const [board, setBoard] = useState(emptyBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState("playing"); // "playing", "win", "draw"
  const [winner, setWinner] = useState(null);

  // Calculate and announce winner/draw
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6], // diags
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  // Handle cell click
  // PUBLIC_INTERFACE
  function handleClick(idx) {
    if (board[idx] || status !== "playing") return;
    const nextBoard = board.slice();
    nextBoard[idx] = xIsNext ? "X" : "O";
    const win = calculateWinner(nextBoard);

    if (win) {
      setBoard(nextBoard);
      setStatus("win");
      setWinner(win);
    } else if (nextBoard.every((cell) => cell)) {
      setBoard(nextBoard);
      setStatus("draw");
      setWinner(null);
    } else {
      setBoard(nextBoard);
      setXIsNext(!xIsNext);
    }
  }

  // PUBLIC_INTERFACE
  function restartGame() {
    setBoard(emptyBoard);
    setXIsNext(true);
    setStatus("playing");
    setWinner(null);
  }

  // Status UI
  let info;
  if (status === "win") {
    info = (
      <div className="ttt-status win">
        Player <span className={`player player-${winner}`}>{winner}</span> wins!
      </div>
    );
  } else if (status === "draw") {
    info = <div className="ttt-status draw">It's a draw!</div>;
  } else {
    info = (
      <div className="ttt-status turn">
        Turn: <span className={`player player-${xIsNext ? "X" : "O"}`}>
          {xIsNext ? "X" : "O"}
        </span>
      </div>
    );
  }

  return (
    <div className="ttt-container">
      <div className="ttt-header">
        <h1>Tic Tac Toe</h1>
      </div>
      {info}
      <div className="ttt-board">
        {board.map((cell, idx) => (
          <button
            className={`ttt-cell${cell ? " filled" : ""}`}
            aria-label={`cell ${Math.floor(idx/3)+1},${(idx%3)+1}`}
            key={idx}
            onClick={() => handleClick(idx)}
            disabled={!!cell || status !== "playing"}
          >
            {cell}
          </button>
        ))}
      </div>
      <div className="ttt-controls">
        {(status === "win" || status === "draw") && (
          <button className="ttt-btn-accent" onClick={restartGame}>
            Restart Game
          </button>
        )}
      </div>
      <footer className="ttt-footer">
        <span>
          <a
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="ttt-link"
          >
            React Tic Tac Toe
          </a>
        </span>
      </footer>
    </div>
  );
}

export default TicTacToe;
