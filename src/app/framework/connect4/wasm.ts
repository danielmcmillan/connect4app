/*
 * Author - Daniel McMillan
 * Wraps functions from the connect4ai WASM module.
 */

const module = (window as any).Module;

export const computeMove: (x: string, y: boolean, z: number) => number =
  module.cwrap("computeMove", "number", ["string", "boolean", "number"]);
export const rowForMove: (x: string, y: number) => number = module.cwrap(
  "rowForMove",
  "number",
  ["string", "number"]
);
export const winningPieces: (x: string, y: boolean) => string = module.cwrap(
  "winningPieces",
  "string",
  ["string", "boolean"]
);
