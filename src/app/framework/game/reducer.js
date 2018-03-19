/**
 * Author - Daniel McMillan
 * @flow
 */
import type { GameState } from './types';
import type { Action } from '../types';
import * as util from '../connect4/boardUtil';
import { computeMove } from '../connect4/ai';

export const gameInitialState: GameState = {
	board: util.getEmptyBoard(),
	currentPlayer: 'red',
};

/**
 * Update the state of the game to start a new turn.
 */
const startTurn = (state: GameState): GameState => {
	if (state.currentPlayer === 'yellow') {
		// AI Player
		const move = computeMove(state.board, state.currentPlayer);
		const board = util.playInColumn(state.board, move, state.currentPlayer);
		return completeTurn({
			...state,
			board: board,
		});
	}
	else {
		return state;
	}
};

/**
 * Update the state of the game to proceed to the next player's turn.
 */
const completeTurn = (state: GameState): GameState => {
	const winningPieces = util.getWinningPieces(state.board, state.currentPlayer);
	if (winningPieces == null) {
		// Game not won yet, start next turn
		const nextPlayer = state.currentPlayer === 'red' ? 'yellow' : 'red';
		return startTurn({
			...state,
			currentPlayer: nextPlayer,
		});
	}
	else {
		return gameInitialState;
	}
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
	case 'PLAY_PIECE':
		if (util.canPlayColumn(state.board, action.column)) {
			return completeTurn({
				...state,
				board: util.playInColumn(state.board, action.column, state.currentPlayer),
			});
		}
		return state;
	default:
		return state;
	}
};
