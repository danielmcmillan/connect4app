/*
 * Author - Daniel McMillan
 * @flow
 */

import type { Board } from '../connect4/types';

// State

export type GameState = {
	board: Board,
};

// Actions

export type ResetGameAction = {
  type: "RESET_GAME",
};

export type StartNextTurnAction = {
  type: "START_NEXT_TURN",
};

export type GameAction =
	| ResetGameAction
	| StartNextTurnAction;
