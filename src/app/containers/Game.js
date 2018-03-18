/**
 * Author - Daniel McMillan
 * @flow
 */
import * as React from 'react';
import type { Dispatch } from 'redux';
import { connect } from 'react-redux';
import type { State, Action, BoardSlotArray, BoardColumn, Player } from '../framework/types';
import { boardSlotArray } from '../framework/game/selectors';
import * as actions from '../framework/game/actions';
import Connect4Board from '../components/Connect4Board';

type Props = {
	boardSlotArray: BoardSlotArray,
	currentPlayer: Player,
	playPiece: (column: BoardColumn) => void,
};

type ContainerState = {
	currentColumn: number | null,
};

class Game extends React.Component<Props, ContainerState> {
	state = {
		currentColumn: null,
	};

	render() {
		return (
			<Connect4Board
				slotRows={this.props.boardSlotArray}
				previewColumnIndex={this.state.currentColumn}
				previewPiecePlayer={this.props.currentPlayer}
				columnHoverChanged={col => this.setState({ currentColumn: col })}
				columnPressed={this.props.playPiece} />
		);
	}
}

/**
 * Map state to props for Game container component
 */
const mapStateToProps = (state: State) => ({
	boardSlotArray: boardSlotArray(state),
	currentPlayer: state.game.currentPlayer,
});

/**
 * Map action dispatch to props for Game container component
 */
const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
	playPiece: column => { dispatch(actions.playPiece(column)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
