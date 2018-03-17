/*
 * Author - Daniel McMillan
 * Wraps functions from the connect4ai WASM module.
 * @flow
 */

export const computeMove: (string, boolean) => number = window.Module.cwrap('computeMove', 'number', ['string', 'boolean']);
export const rowForMove: (string, number) => number = window.Module.cwrap('rowForMove', 'number', ['string', 'number']);
export const winningPieces: (string, boolean) => string | null = window.Module.cwrap('rowForMove', 'string', ['string', 'boolean']);
