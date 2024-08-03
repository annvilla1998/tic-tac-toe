import React, { useState } from 'react';
import { GameBoard } from "./components/GameBoard/game-board";
import { gameStatuses } from "./utils/game-statuses";
import './App.css';

const App = () => {
  const [gameStatus, setGameStatus] = useState(gameStatuses["X"]);
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [disabledBoard, setDisabledBoard] = useState(false);
  const [playedSquares, setPlayedSquares] = useState([]);
  const [board, setBoard] = useState([["", "", ""],
                                      ["", "", ""],
                                      ["", "", ""]]);

  const resetGame = (e) => {
    e.preventDefault(); 

    setGameStatus(gameStatuses["X"]);
    setBoard([["", "", ""],
              ["", "", ""],
              ["", "", ""]]);
    setDisabledBoard(false);
    setPlayer("X");
    setPlayedSquares([]);
    setWinner(null);
  }

  return (
    <>
      <div id="tic-tac-toe">
        <div className="winner-container">
        {winner && <span className="congrats-message">Congratulations {player}! You Won!</span>}
        <div className="winner">
          {winner === "X" && <img alt="winner-x" className="winner-gif" decoding="async" height="100px" width="100px" src="https://media.tenor.com/TolydnT8A5QAAAAi/capital-letter-dancing-letter.gif"/>}
          {winner === "O" && <img alt="winner-x" className="winner-gif" decoding="async" height="100px" width="100px" src="https://media.tenor.com/dkCwZF-ltCQAAAAi/dancing-letter-letter.gif"/>}
          <div className="status" key={board}>{gameStatus}</div>
        </div>
        </div>
        <GameBoard 
          board={board}
          disabledBoard={disabledBoard}
          playedSquares={playedSquares}
          player={player} 
          setBoard={setBoard}
          setDisabledBoard={setDisabledBoard}
          setGameStatus={setGameStatus} 
          setPlayer={setPlayer}
          setPlayedSquares={setPlayedSquares}
          setWinner={setWinner}
          />
        <button className="reset" onClick={resetGame}>Reset Game</button>
      </div>
    </>
  )
}

export default App;