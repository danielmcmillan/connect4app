/*
 * Author - Daniel McMillan
 */
import type { GameState, GameAction } from "./game/types";

/**
 * Type of the store's state.
 */
export interface State {
  game: GameState;
}

/**
 * Type matching any of the app's actions.
 */
export type Action = GameAction;

/**
 * Type matching the type string for any action.
 */
export type ActionType = Action["type"];

// Export all types
export * from "./game/types";
export * from "./connect4/types";
