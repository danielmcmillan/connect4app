/**
 * Author - Daniel McMillan
 * @flow
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './framework/store';

const store = configureStore();

class App extends Component<{}> {
	render() {
		return (
			<Provider store={store}>
				<div></div>
			</Provider>
		);
	}
}

export default App;
