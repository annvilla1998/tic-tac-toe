import React, { useState, useEffect } from 'react';
import { Square } from "./square";
import { gameStatuses } from "../../utils/game-statuses"
import './game-board.css';

export const GameBoard = ({ 
  board, 
  disabledBoard,
  playedSquares, 
  player, 
  setBoard, 
  setDisabledBoard, 
  setGameStatus, 
  setPlayedSquares,
  setPlayer,
  setWinner
  }) => {
  const [lastPlay, setLastPlay] = useState([]);

  useEffect(() => {
    // If this is the first move, the board will be empty and so will lastPlay
    if(!lastPlay.length) return;

    const currRow = lastPlay[0];
    const currCol = lastPlay[1];

    const checkRow = (row) => {
      for(let col = 0; col < 3; col++) {
        if(board[row][col] !== player) {
          return false;
        }
      }
      return true;
    };

    const checkCol = (col) => {
      for(let row = 0; row < 3; row++) {
        if(board[row][col] !== player) {
          return false;
        }
      }
      return true;
    };

    const checkDiag = () => {
      if(board[0][0] === player 
        && board[1][1] === player
        && board[2][2] === player) {
        return true;
      }

      if(board[0][2] === player
        && board[1][1] === player
        && board[2][0] === player) {
        return true;
      }

      return false;
    }

    const hasWon = (row, col) => {
      const isFullRow = checkRow(row);
      const isFullCol = checkCol(col);
      const isFullDiag = checkDiag();

      if(isFullCol || isFullRow || isFullDiag) {
        return true;
      }

      return false;
    }

    if(hasWon(currRow, currCol)) {
      setGameStatus(gameStatuses[`winner${player}`]);
      setDisabledBoard(true);
      setWinner(player);
    } else if(playedSquares.length >= 9) {
      setGameStatus(gameStatuses["tie"]);
      setDisabledBoard(true);
    } else if(playedSquares.length) {
      const nextPlayer = player === "X" ? "O" : "X";
      setGameStatus(gameStatuses[nextPlayer]);
      setPlayer(nextPlayer);
    }

  }, [board, lastPlay]);

  const takeTurn = (row, col) => {
    setBoard(prev => {
      const newState = prev.map((r, rIdx) => {
        return r.map((c, cIdx) => {
          return (rIdx === row && cIdx === col) ? player : c;
        })
      })
      return newState;
    })
    setLastPlay([row, col]);
    setPlayedSquares(prev => [...prev, `${row}-${col}`]);
  };

  return (
    <div className="game-board">
      {board.map((ele, row) => {
        return ele.map((ele, col) => {
          const key= `${row}-${col}`;
          const disabledSquare = playedSquares.includes(key);

          return (
            <Square 
              board={board} 
              col={col} 
              disabledBoard={disabledBoard} 
              disabledSquare={disabledSquare}
              key={key} 
              player={player} 
              row={row} 
              takeTurn={takeTurn} 
            />
          )
        })
      })}
    </div>
  );
};