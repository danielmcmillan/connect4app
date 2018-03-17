/*
 * Author - Daniel McMillan
 * @flow
 */
import * as Type from './types';

/**
 * Action causing the state of the game to reset.
 */
export const resetGame = (): Type.ResetGameAction => ({
	type: 'RESET_GAME',
});

/**
 * Action proceeding the game to the next player
 */
export const startNextTurn = (): Type.StartNextTurnAction => ({
	type: 'START_NEXT_TURN',
});
