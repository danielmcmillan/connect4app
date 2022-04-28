/*
 * Author - Daniel McMillan
 */
import * as React from "react";
import type { Dispatch } from "redux";
import { connect } from "react-redux";
import type {
  State,
  Action,
  BoardSlotArray,
  BoardColumn,
  Player,
  PlayerConfig,
} from "../framework/types";
import { boardSlotArray } from "../framework/game/selectors";
import * as actions from "../framework/game/actions";
import Connect4Board from "../components/Connect4Board";
import GameConfig from "../components/GameConfig";

interface Props {
  boardSlotArray: BoardSlotArray;
  currentPlayer: Player;
  gameOver: boolean;
  players: { [x in Player]: PlayerConfig };
  startGame: () => void;
  playPiece: (column: BoardColumn) => void;
  updateConfig: (
    config?: { [x in Player]?: PlayerConfig },
    player?: Player
  ) => void;
}

type ContainerState = {
  currentColumn: number | null;
};

class Game extends React.Component<Props, ContainerState> {
  state = {
    currentColumn: null,
  };

  render() {
    return (
      <div>
        {this.props.gameOver && (
          <Connect4Board slotRows={this.props.boardSlotArray} />
        )}
        {this.props.gameOver && (
          <GameConfig
            players={this.props.players}
            startPlayer={this.props.currentPlayer}
            onConfigChange={this.props.updateConfig}
            onStartGame={this.props.startGame}
          />
        )}
        {!this.props.gameOver && (
          <Connect4Board
            slotRows={this.props.boardSlotArray}
            previewColumnIndex={this.state.currentColumn}
            previewPiecePlayer={this.props.currentPlayer}
            columnHoverChanged={(col) => this.setState({ currentColumn: col })}
            columnPressed={this.props.playPiece}
          />
        )}
      </div>
    );
  }
}

/**
 * Map state to props for Game container component
 */
const mapStateToProps = (state: State) => ({
  boardSlotArray: boardSlotArray(state),
  currentPlayer: state.game.currentPlayer,
  gameOver: state.game.gameOver,
  players: state.game.players,
});

/**
 * Map action dispatch to props for Game container component
 */
const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): Pick<Props, "startGame" | "playPiece" | "updateConfig"> => ({
  startGame: () => {
    dispatch(actions.startGame());
  },
  playPiece: (column) => {
    dispatch(actions.playPiece(column));
  },
  updateConfig: (players, startPlayer) => {
    dispatch(actions.updateConfig(players, startPlayer));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
