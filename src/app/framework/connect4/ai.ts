/*
 * Author - Daniel McMillan
 */

import type { Board, Player, BoardColumn } from "./types";
import { computeMove as _computeMove } from "./wasm";

/**
 * Use the AI to determine which column to play in.
 *
 * @param board String representing the board.
 * @param yellow The player to compute the move for.
 * @param difficulty Positive integer specifying difficulty for the AI.
 * @return The column to play in.
 */
export const computeMove = (
  board: Board,
  player: Player,
  difficulty: number
): BoardColumn => {
  const yellow = player === "yellow";
  return _computeMove(board, yellow, difficulty);
};
