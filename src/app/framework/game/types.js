/*
 * Author - Daniel McMillan
 * @flow
 */

import type { Board, BoardColumn, Player } from '../connect4/types';

// General

export type PlayerConfig =
| {
	type: 'human',
}
| {
	type: 'ai',
	difficulty: number,
};

// State

export type GameState = {
	board: Board,
	currentPlayer: Player,
	gameOver: boolean,
	players: {
		[Player]: PlayerConfig,
	},
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
