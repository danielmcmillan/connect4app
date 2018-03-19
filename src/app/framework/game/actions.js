/*
 * Author - Daniel McMillan
 * @flow
 */
import type {
	StartGameAction,
	PlayPieceAction,
	UpdateConfigAction,
	PlayerConfig,
} from './types';
import type { Player, BoardColumn } from '../types';

/**
 * Action causing the state of the game to reset, but not configuration.
 */
export const startGame = (): StartGameAction => ({
	type: 'START_GAME',
});

/**
 * Action that adds a piece to the board and proceeds to the next turn.
 */
export const playPiece = (column: BoardColumn): PlayPieceAction => ({
	type: 'PLAY_PIECE',
	column,
});

/**
 * Update game configuration.
 * @param redConfig Configuration for red player
 * @param yellowConfig Configuration for yellow player
 * @param startPlayer Player to start on the first turn
 */
export const updateConfig = (
	players?: {
		red?: PlayerConfig,
		yellow?: PlayerConfig,
	},
	startPlayer?: Player
): UpdateConfigAction => ({
	type: 'UPDATE_CONFIG',
	players,
	startPlayer,
});
