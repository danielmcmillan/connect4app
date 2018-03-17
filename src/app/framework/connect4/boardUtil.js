/*
 * Author - Daniel McMillan
 * @flow
 */
import type { Board, Player, BoardColumn, BoardRow } from './types';
import { rowForMove, winningPieces } from './wasm';

const emptySlotChar = '.';
const rowSeparatorChar = ',';
const redChar = 'r';
const yellowChar = 'y';
type SlotItem = '.' | 'r' | 'y';

export const boardWidth = 7;
export const boardHeight = 6;

/**
 * Get the index within a Board string for a slot at given row and column.
 */
const getBoardIndex = (row: BoardRow, col: BoardColumn): number =>
	(row * (boardWidth + 1)) + col;

/**
 * Get a new board with the character for specified slot changed.
 */
const setBoardItem = (board: Board, row: BoardRow, col: BoardColumn, item: SlotItem): Board => {
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
export const playInColumn = (board: Board, column: BoardColumn, player: Player): Board => {
	const row = rowForMove(board, column);
	if (row >= 0 && row < boardHeight) {
		const slotItem: SlotItem = player === 'red' ? redChar : yellowChar;
		return setBoardItem(board, row, column, slotItem);
	}
	return board;
};

/**
 * Get an array of the [row, column] slot location of pieces that are part of a winning connection.
 * @param board Board to check for winning pieces in.
 * @param player Player to check winning pieces for.
 * @return Array of the [row, column] of winning pieces, or null if the player hasn't won.
 */
export const getWinningPieces = (board: Board, player: Player): Array<[BoardRow, BoardColumn]> | null => {
	const yellow = player === 'yellow';
	const winningBoard = winningPieces(board, yellow);
	if (winningBoard == null) {
		return null;
	}

	const pieces = [];
	for (let row = 0; row < boardHeight; ++row) {
		for (let col = 0; col < boardWidth; ++col) {
			const index = getBoardIndex(row, col);
			if (winningBoard[index] !== emptySlotChar) {
				pieces.push([row, col]);
			}
		}
	}
	return pieces;
};
