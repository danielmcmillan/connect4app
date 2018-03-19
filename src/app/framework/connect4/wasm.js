/*
 * Author - Daniel McMillan
 * Wraps functions from the connect4ai WASM module.
 * @flow
 */

export const computeMove: (string, boolean, number) => number =
	window.Module.cwrap('computeMove', 'number', ['string', 'boolean', 'number']);
export const rowForMove: (string, number) => number =
	window.Module.cwrap('rowForMove', 'number', ['string', 'number']);
export const winningPieces: (string, boolean) => string =
	window.Module.cwrap('winningPieces', 'string', ['string', 'boolean']);
