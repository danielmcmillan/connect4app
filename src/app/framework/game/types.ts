/*
 * Author - Daniel McMillan
 */

import { Board, BoardColumn, Player } from "../connect4/types";

// General

export type PlayerConfig =
  | {
      type: "human";
    }
  | {
      type: "ai";
      difficulty: number;
    };

// State

export interface GameState {
  board: Board;
  currentPlayer: Player;
  gameOver: boolean;
  players: {
    [x in Player]: PlayerConfig;
  };
}

// Actions

export interface StartGameAction {
  type: "START_GAME";
}

export interface PlayPieceAction {
  type: "PLAY_PIECE";
  column: BoardColumn;
}

export interface UpdateConfigAction {
  type: "UPDATE_CONFIG";
  players?: {
    red?: PlayerConfig;
    yellow?: PlayerConfig;
  };
  startPlayer?: Player;
}

export type GameAction = StartGameAction | PlayPieceAction | UpdateConfigAction;
