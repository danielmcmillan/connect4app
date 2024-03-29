/*
 * Author - Daniel McMillan
 */
import { createSelector } from "reselect";
import type { State } from "../types";
import type { BoardSlotArray } from "../connect4/types";
import { getBoardSlotArray } from "../connect4/boardUtil";

/**
 * Get the pieces in the board as an array of rows.
 * Each row is an array with an element for each column. Each element is the
 * player owning the piece at that position, or null if there is no piece.
 */
export const boardSlotArray: (state: State) => BoardSlotArray = createSelector(
  (state: State) => state.game.board,
  getBoardSlotArray
);
