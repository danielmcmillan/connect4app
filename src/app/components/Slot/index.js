/**
 * Author - Daniel McMillan
 * @flow
 */
import * as React from 'react';

const style = {
	width: '100%',
	height: '100%',
	position: 'absolute',
};

const slotStyle = {
	holeColor: 'white',
	holeOutlineColor: 'blue',
	outsideColor: '#1c6dfb',
};

class Slot extends React.Component<{}> {
	render() {
		return (
			<div {...this.props} style={style}>
				<svg style={{
					width: '100%',
					height: '100%',
					display: 'block',
					position: 'absolute',
					backgroundColor: slotStyle.outsideColor,
				}}>
					<circle cx="50%" cy="50%" r="49%" strokeWidth="2" fill={slotStyle.holeColor} stroke={slotStyle.holeOutlineColor} />
				</svg>
			</div>
		);
	}
}

export default Slot;
