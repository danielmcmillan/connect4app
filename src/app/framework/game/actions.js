/*
 * Author - Daniel McMillan
 * @flow
 */
import * as Game from './types';
import type { BoardColumn } from '../types';

/**
 * Action causing the state of the game to reset.
 */
export const resetGame = (): Game.ResetGameAction => ({
	type: 'RESET_GAME',
});

/**
 * Action that adds a piece to the board and proceeds to the next turn.
 */
export const playPiece = (column: BoardColumn): Game.PlayPieceAction => ({
	type: 'PLAY_PIECE',
	column,
});
