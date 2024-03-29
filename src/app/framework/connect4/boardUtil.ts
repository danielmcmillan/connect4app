/*
 * Author - Daniel McMillan
 */
import type {
  Board,
  Player,
  BoardColumn,
  BoardRow,
  BoardSlotArray,
} from "./types";
import { rowForMove, winningPieces } from "./wasm";

const emptySlotChar = ".";
const rowSeparatorChar = ",";
const redChar = "r";
const yellowChar = "y";
type SlotItem = "." | "r" | "y";

export const boardWidth = 7;
export const boardHeight = 6;

/**
 * Get the index within a Board string for a slot at given row and column.
 */
const getBoardIndex = (row: BoardRow, col: BoardColumn): number =>
  row * (boardWidth + 1) + col;

/**
 * Get a new board with the character for specified slot changed.
 */
const setBoardItem = (
  board: Board,
  row: BoardRow,
  col: BoardColumn,
  item: SlotItem
): Board => {
  const index = getBoardIndex(row, col);
  return board.substr(0, index) + item + board.substr(index + 1);
};

/**
 * @return Empty Board.
 */
export const getEmptyBoard = (): Board => {
  const row = emptySlotChar.repeat(boardWidth);
  return (row + rowSeparatorChar).repeat(boardHeight - 1) + row;
};

/**
 * Check whether it is possible to play into a column.
 * @param board Board to play piece into.
 * @param column Column to play into.
 * @return True if the column has a free spot, otherwise false.
 */
export const canPlayColumn = (board: Board, column: BoardColumn): boolean => {
  return rowForMove(board, column) < boardHeight;
};

/**
 * Play into the specified column.
 * @param board Board to play piece into.
 * @param column Column to play into.
 * @param player Player owning the piece to be played.
 * @return A new board with the new piece played.
 */
export const playInColumn = (
  board: Board,
  column: BoardColumn,
  player: Player
): Board => {
  const row = rowForMove(board, column);
  if (row >= 0 && row < boardHeight) {
    const slotItem: SlotItem = player === "red" ? redChar : yellowChar;
    return setBoardItem(board, row, column, slotItem);
  }
  return board;
};

/**
 * Get a Board containing only pieces that are part of a winning connection.
 * @param board Board to check for winning pieces in.
 * @param player Player to check winning pieces for.
 * @return A new Board with winning pieces, or null if the player hasn't won.
 */
export const winningPiecesBoard = (
  board: Board,
  player: Player
): Board | null => {
  const yellow = player === "yellow";
  const winningBoard = winningPieces(board, yellow);
  if (winningBoard.length === 0) {
    return null;
  }
  return winningBoard;
};

/**
 * Get the pieces in the board as an array of rows.
 * Each row is an array with an element for each column. Each element is the
 * player owning the piece at that position, or null if there is no piece.
 * @param board Board to check for winning pieces in.
 * @return Array of Array of (Player or null)
 */
export const getBoardSlotArray = (board: Board): BoardSlotArray => {
  const rows: Array<Array<Player | null>> = [];
  let i = 0;
  for (let row = 0; row < boardHeight; ++row) {
    rows[row] = [];
    for (let col = 0; col < boardWidth; ++col) {
      switch (board[i]) {
        case "r":
          rows[row].push("red");
          break;
        case "y":
          rows[row].push("yellow");
          break;
        default:
          rows[row].push(null);
          break;
      }
      ++i;
    }
    // Skip the row separator character
    ++i;
  }
  return rows;
};

/**
 * Check whether the given board is full (no empty slots).
 * @param board Board to check for fullness.
 * @return True iff the board is full.
 */
export const isBoardFull = (board: Board): boolean => {
  return !board.includes(".");
};
