/*
 * Author - Daniel McMillan
 */
jest.mock("./wasm", () => ({
  rowForMove: jest.fn((board, column) => {
    if (column === 1) {
      return 0;
    } else if (column === 2) {
      return 6;
    } else {
      return 4;
    }
  }),
  winningPieces: jest.fn((board, yellow) => {
    if (yellow) {
      return "";
    } else {
      return "..r....,...r...,....r..,.....r.,.......,.......";
    }
  }),
}));

import * as util from "./boardUtil";
test("empty board", () => {
  expect(util.getEmptyBoard()).toBe(
    ".......,.......,.......,.......,.......,......."
  );
});

test("canPlayColumn true when free row for column is valid", () => {
  expect(util.canPlayColumn("", 0)).toBeTruthy();
  expect(util.canPlayColumn("", 1)).toBeTruthy();
});

test("canPlayColumn false when free row for column is invalid", () => {
  expect(util.canPlayColumn("", 2)).toBeFalsy();
});

test("playInColumn", () => {
  const board = "..r..y.,..r..y.,..r..y.,..r..y.,..r....,..r....";
  expect(util.playInColumn(board, 1, "red")).toBe(
    ".rr..y.,..r..y.,..r..y.,..r..y.,..r....,..r...."
  );
  expect(util.playInColumn(board, 1, "yellow")).toBe(
    ".yr..y.,..r..y.,..r..y.,..r..y.,..r....,..r...."
  );
  expect(util.playInColumn(board, 5, "red")).toBe(
    "..r..y.,..r..y.,..r..y.,..r..y.,..r..r.,..r...."
  );
});

test("winningPiecesBoard", () => {
  expect(util.winningPiecesBoard("", "red")).toBe(
    "..r....,...r...,....r..,.....r.,.......,......."
  );
  expect(util.winningPiecesBoard("", "yellow")).toBeNull();
});

test("getBoardSlotArray returns arrays will all elements null for empty board", () => {
  expect(util.getBoardSlotArray(util.getEmptyBoard())).toEqual([
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ]);
});

test("getBoardSlotArray returns arrays will all elements null for empty board", () => {
  expect(
    util.getBoardSlotArray(".r.....,.......,.......,.......,.......,.......")
  ).toEqual([
    [null, "red", null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ]);
});
