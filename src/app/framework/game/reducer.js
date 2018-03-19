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
	gameOver: false,
	players: {
		red: { type: 'human' },
		yellow: {
			type: 'ai',
			difficulty: 2,
		},
	},
};

/**
 * Update the state of the game to start a new turn.
 * Proceeds to the next turn if current player is AI.
 */
const startTurn = (state: GameState): GameState => {
	const playerConfig = state.players[state.currentPlayer];
	if (playerConfig.type === 'ai') {
		// AI Player
		const move = computeMove(state.board, state.currentPlayer, playerConfig.difficulty);
		const board = util.playInColumn(state.board, move, state.currentPlayer);
		return nextTurn({
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
const nextTurn = (state: GameState): GameState => {
	const winningBoard = util.winningPiecesBoard(state.board, state.currentPlayer);
	if (winningBoard == null) {
		// Game not won yet, start next turn
		const nextPlayer = state.currentPlayer === 'red' ? 'yellow' : 'red';
		return startTurn({
			...state,
			currentPlayer: nextPlayer,
		});
	}
	else {
		return {
			...state,
			board: winningBoard,
			gameOver: true,
		};
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
		if (state.gameOver) {
			return gameInitialState;
		}
		if (util.canPlayColumn(state.board, action.column)) {
			return nextTurn({
				...state,
				board: util.playInColumn(state.board, action.column, state.currentPlayer),
			});
		}
		return state;
	default:
		return state;
	}
};
