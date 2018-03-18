/*
 * Author - Daniel McMillan
 * @flow
 */
export type Board = string;
export type Player = 'red' | 'yellow';
export type BoardColumn = number;
export type BoardRow = number;
export type BoardSlotArray = Array<Array<Player | null>>;
