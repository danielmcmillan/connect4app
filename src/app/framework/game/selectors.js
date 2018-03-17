/*
 * Author - Daniel McMillan
 * @flow
 */
import type { State } from '../types';
import type { Player } from '../connect4/types';

/**
 * Get the pieces in the board as an array of rows.
 * Each row is an array with an element for each column. Each element is the
 * player owning the piece at that position, or null if there is no piece.
 */
export const boardPieces = (state: State): Array<Array<Player | null>> => {
	return [[]];
};
