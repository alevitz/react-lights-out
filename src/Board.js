import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 2, ncols = 2, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < nrows; i++) {
      let row = [];
      for (let j = 0; j < ncols; j++) {
        row.push(Math.round(Math.random()) ? true : false);
      }
      initialBoard.push(row);
    }


    return initialBoard;
  }

  function hasWon() {
    
    // TODO: check the board in state to determine whether the player has won.
    for (let i = 0; i < nrows; i++) {
      for (let j = 0; j < ncols; j++) {
        console.log(board);
        if (board[i][j] === true) {
          
          return false;
        }
      }
    }
    console.log("you won!")
    return true;
  }


  function flipCellsAround(coord) {

    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard

      let boardCopy = oldBoard.slice();


      // TODO: in the copy, flip this cell and the cells around it




      // TODO: return the copy
      flipCell(x, y, boardCopy);
      flipCell(x + 1, y, boardCopy)
      flipCell(x - 1, y, boardCopy)
      flipCell(x, y + 1, boardCopy)
      flipCell(x, y - 1, boardCopy)

      if (hasWon()) {
        console.log("ok")
      }

      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board



  return (
    hasWon() ? <div>You won!</div> :
    <table>
      {board.map((r, i) => <tr>{r.map((c, j) => Cell({ flipCellsAroundMe: () => flipCellsAround(`${j}-${i}`), isLit: c }))}</tr>)}

    </table>
  )

  // TODO



}

export default Board;
