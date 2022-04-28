/*
 * Author - Daniel McMillan
 */
import { combineReducers } from "redux";
import { State, Action } from "./types";
import { gameInitialState, gameReducer } from "./game/reducer";

export const initialState: State = { game: gameInitialState };

export const rootReducer: (state: State | undefined, action: Action) => State =
  combineReducers({
    game: gameReducer,
  });
