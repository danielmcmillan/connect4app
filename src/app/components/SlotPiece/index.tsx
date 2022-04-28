/*
 * Author - Daniel McMillan
 */
import * as React from "react";
import type { Player } from "../../framework/connect4/types";

export type Props = {
  player: Player;
};

const style: React.CSSProperties = {
  width: "100%",
  height: "100%",
  position: "absolute",
};

const pieceStyle = {
  redColor: "red",
  redOutlineColor: "#b51010",
  yellowColor: "yellow",
  yellowOutlineColor: "#e0e54b",
};

class SlotPiece extends React.Component<Props> {
  render() {
    const color =
      this.props.player === "red"
        ? pieceStyle.redColor
        : pieceStyle.yellowColor;
    const outlineColor =
      this.props.player === "red"
        ? pieceStyle.redOutlineColor
        : pieceStyle.yellowOutlineColor;

    return (
      <div {...this.props} style={style}>
        <svg
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            position: "absolute",
          }}
        >
          <circle
            cx="50%"
            cy="50%"
            r="47%"
            strokeWidth="4"
            stroke={outlineColor}
            fill={color}
          />
        </svg>
      </div>
    );
  }
}

export default SlotPiece;
