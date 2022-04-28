/*
 * Daniel McMillan - 2018-02-28
 */

import { createStore, applyMiddleware } from "redux";
import { Store } from "redux";
import { rootReducer, initialState } from "./reducer";
import { State, Action } from "./types";

/**
 * Configure the Redux store with middleware and the root reducer.
 * @returns The Redux store
 */
const configureStore = (): Store<State, Action> => {
  const middleware = applyMiddleware();
  const store = createStore(rootReducer, initialState, middleware);

  return store;
};

export default configureStore;
