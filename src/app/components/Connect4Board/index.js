/**
 * Author - Daniel McMillan
 * @flow
 */
import * as React from 'react';
import { range } from 'lodash';
import type { Player, BoardColumn } from '../../framework/connect4/types';
import { boardWidth, boardHeight } from '../../framework/connect4/boardUtil';
import Slot from '../Slot';
import SlotPiece from '../SlotPiece';

export type Props = {
	slotRows: Array<Array<Player | null>>,
	previewColumnIndex?: BoardColumn | null,
	previewPiecePlayer?: Player | null,
	columnHoverChanged?: (BoardColumn | null) => void,
	columnPressed?: (BoardColumn) => void,
};

const style = {
	width: '100vmin',
	height: '100vmin',
	margin: 'auto',

	display: 'flex',
	flexDirection: 'column',
};

/**
 * Get style for given row.
 */
const rowStyle = row => ({
	order: -row,
	flexGrow: 1,
	flexBasis: 0,
	flexShrink: 0,

	display: 'flex',
	flexDirection: 'row',
	position: 'relative',
});

const cellStyle = {
	flexGrow: 1,
	flexBasis: 0,
	flexShrink: 0,
	position: 'relative',
};

type ComponentState = {
	currentColumn: BoardColumn | null,
};

class Connect4Board extends React.Component<Props, ComponentState> {
	state = {
		currentColumn: null,
	};

	handleColumnHover(column: BoardColumn, leaving: boolean) {
		if (this.props.columnHoverChanged != null) {
			this.props.columnHoverChanged(leaving ? null : column);
		}
	}

	handleColumnPress(column: BoardColumn) {
		if (this.props.columnPressed != null) {
			this.props.columnPressed(column);
		}
	}

	render() {
		return (
			<div style={style}>
				{/* Show the preview piece in top row if there is one set */}
				<div style={rowStyle(boardHeight)}>
					{
						range(boardWidth).map(col => (
							<div key={col} style={cellStyle}
								onMouseEnter={() => this.handleColumnHover(col, false)}
								onMouseLeave={() => this.handleColumnHover(col, true)}
								onClick={() => this.handleColumnPress(col)}>
								{this.props.previewPiecePlayer != null && this.props.previewColumnIndex === col &&
									<SlotPiece player={this.props.previewPiecePlayer} />
								}
							</div>
						))
					}
				</div>
				{/* Map board pieces to SlotPiece components */}
				{
					this.props.slotRows.map((rowSlots, row) => (
						<div key={row} style={rowStyle(row)}>
							{rowSlots.map((player, col) => (
								<div key={`${row}x${col}`} style={cellStyle}>
									<Slot
										onMouseEnter={() => this.handleColumnHover(col, false)}
										onMouseLeave={() => this.handleColumnHover(col, true)}
										onClick={() => this.handleColumnPress(col)} />
									{player != null &&
										<SlotPiece
											player={player}
											onMouseEnter={() => this.handleColumnHover(col, false)}
											onMouseLeave={() => this.handleColumnHover(col, true)}
											onClick={() => this.handleColumnPress(col)} />
									}
								</div>
							))}
						</div>
					))
				}
			</div>
		);
	}
}

export default Connect4Board;
