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

export type StartGameAction = {
	type: 'START_GAME',
};

export type PlayPieceAction = {
	type: 'PLAY_PIECE',
	column: BoardColumn,
};

export type UpdateConfigAction = {
	type: 'UPDATE_CONFIG',
	players?: {
		red?: PlayerConfig,
		yellow?: PlayerConfig,
	},
	startPlayer?: Player,
};

export type GameAction =
	| StartGameAction
	| PlayPieceAction
	| UpdateConfigAction;
