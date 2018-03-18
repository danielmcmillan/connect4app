/**
 * Author - Daniel McMillan
 * @flow
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './framework/store';
import Connect4Board from './components/Connect4Board';

const store = configureStore();

class App extends Component<{}, { currentColumn: number | null }> {
	state = {
		currentColumn: null,
	};

	render() {
		return (
			<Provider store={store}>
				<Connect4Board
					slotRows={[
						[null, null, 'red', null, 'yellow', 'red', null],
						[null, null, 'yellow', null, 'red', 'red', null],
						[null, null, null, null, null, 'yellow', null],
						[null, null, null, null, null, 'yellow', null],
						[null, null, null, null, null, 'red', null],
						[null, null, null, null, null, null, null],
					]}
					previewColumnIndex={this.state.currentColumn}
					previewPiecePlayer="red"
					columnHoverChanged={col => this.setState({ currentColumn: col })} />
			</Provider>
		);
	}
}

export default App;
