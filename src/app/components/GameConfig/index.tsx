/*
 * Author - Daniel McMillan
 */
import * as React from "react";
import type { Player, PlayerConfig } from "../../framework/types";

export type Props = {
  players: { [x in Player]: PlayerConfig };
  startPlayer: Player;
  onConfigChange: (
    config?: { [x in Player]?: PlayerConfig },
    player?: Player
  ) => void;
  onStartGame: () => void;
};

const defaultDifficulty = 2;
const players: Player[] = ["red", "yellow"];

const style: React.CSSProperties = {
  width: "100vmin",
  minWidth: 420,
  minHeight: "100vmin",
  margin: "auto",
  boxSizing: "border-box",
  padding: 20,
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,

  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",

  backgroundColor: "#aaaaaa",
  opacity: 0.9,
  textAlign: "center",
};

class GameConfig extends React.Component<Props> {
  playerTypeChanged(player: Player, type: PlayerConfig["type"]) {
    const config: PlayerConfig =
      type === "human"
        ? { type: "human" }
        : {
            type: "ai",
            difficulty: defaultDifficulty,
          };
    this.props.onConfigChange({ [player]: config });
  }

  playerDifficultyChanged(player: Player, difficulty: number) {
    this.props.onConfigChange({
      [player]: {
        type: "ai",
        difficulty,
      },
    });
  }

  render() {
    return (
      <div style={style}>
        <h1>Connect 4</h1>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {players.map((player: Player) => {
            const playerConfig = this.props.players[player];
            return (
              <div key={player} style={{ flex: 1 }}>
                <h2>Configure {player} player</h2>
                <label>Type: </label>
                <div>
                  <select
                    value={playerConfig.type}
                    onChange={(event) => {
                      this.playerTypeChanged(
                        player,
                        event.target.value as PlayerConfig["type"]
                      );
                    }}
                  >
                    <option value="human">Human</option>
                    <option value="ai">Computer</option>
                  </select>
                </div>
                {playerConfig.type === "ai" && (
                  <div>
                    <label>Difficulty: </label>
                    <input
                      type="range"
                      value={playerConfig.difficulty}
                      min="1"
                      max="12"
                      onChange={(event) => {
                        this.playerDifficultyChanged(
                          player,
                          event.target.valueAsNumber
                        );
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <button onClick={this.props.onStartGame}>Start Game</button>
      </div>
    );
  }
}

export default GameConfig;
