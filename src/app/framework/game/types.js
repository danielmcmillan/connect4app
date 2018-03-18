/*
 * Author - Daniel McMillan
 * @flow
 */

import type { Board, BoardColumn, Player } from '../connect4/types';

// State

export type GameState = {
	board: Board,
	currentPlayer: Player,
};

// Actions

export type ResetGameAction = {
  type: "RESET_GAME",
};

export type PlayPieceAction = {
	type: "PLAY_PIECE",
	column: BoardColumn,
};

export type GameAction =
	| ResetGameAction
	| PlayPieceAction;
