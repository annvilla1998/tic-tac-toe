import React from 'react';

export const Square = ({ board, disabledBoard, disabledSquare, row, col, takeTurn }) => {

  const handleClick = (e) => {
    e.preventDefault();

    takeTurn(row, col);
  };
  

  return (
    <div 
      className="square" 
      onClick={handleClick} 
      style={disabledBoard || disabledSquare ? { pointerEvents: "none" } : {}}
    >
      <span className="symbol">{board[row][col]}</span>
    </div>
  );
};