/**
 * Author - Daniel McMillan
 * @flow
 */
import type { GameState, PlayerConfig } from './types';
import type { Action, Player } from '../types';
import * as util from '../connect4/boardUtil';
import { computeMove } from '../connect4/ai';

export const gameInitialState: GameState = {
	board: util.getEmptyBoard(),
	currentPlayer: 'red',
	gameOver: true,
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
		const board = (move < 0)
			? state.board // AI didn't find valid move
			: util.playInColumn(state.board, move, state.currentPlayer);
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
	const nextPlayer = state.currentPlayer === 'red' ? 'yellow' : 'red';
	const winningBoard = util.winningPiecesBoard(state.board, state.currentPlayer);
	if (winningBoard == null) {
		if (util.isBoardFull(state.board)) {
			// Draw
			return {
				...state,
				gameOver: true,
			};
		}
		// Game not over yet, start next turn
		return startTurn({
			...state,
			currentPlayer: nextPlayer,
		});
	}
	else {
		// Game over with a winner, show the winning pieces
		return {
			...state,
			currentPlayer: nextPlayer,
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
	case 'START_GAME':
		return startTurn({
			...state,
			board: util.getEmptyBoard(),
			gameOver: false,
		});
	case 'PLAY_PIECE':
		if (state.gameOver) {
			return state;
		}
		if (util.canPlayColumn(state.board, action.column)) {
			return nextTurn({
				...state,
				board: util.playInColumn(state.board, action.column, state.currentPlayer),
			});
		}
		return state;
	case 'UPDATE_CONFIG':
		return {
			...state,
			currentPlayer: action.startPlayer || state.currentPlayer,
			players: {
				...state.players,
				red: (action.players && action.players.red) || state.players.red,
				yellow: (action.players && action.players.yellow) || state.players.yellow,
			},
		};
	default:
		return state;
	}
};
