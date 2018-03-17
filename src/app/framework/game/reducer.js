/**
 * Author - Daniel McMillan
 * @flow
 */
import type { GameState } from './types';
import type { Action } from '../types';

export const gameInitialState: GameState = {
	board: '',
};

/**
 * Reducer for the Comics actions.
 */
export const gameReducer = (
	state: GameState = gameInitialState,
	action: Action
): GameState => {
	switch (action.type) {
	case 'RESET_GAME':
		return gameInitialState;
	default:
		return state;
	}
};
