/**
 * Author - Daniel McMillan
 * @flow
 */
import { combineReducers } from 'redux';
import type { State, Action } from './types';
import { gameInitialState, gameReducer } from './game/reducer';

export const initialState: State = { game: gameInitialState };

export const rootReducer: (State, Action) => State = combineReducers({ game: gameReducer });
