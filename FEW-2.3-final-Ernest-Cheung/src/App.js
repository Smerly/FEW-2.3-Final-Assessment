import logo from './logo.svg';
import './App.css';
import Home from './Home';
import { useState } from 'react';
import StarWars from './StarWars';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { createStore } from 'redux';
import Load from './Load';

const ID_STATE = 'ID_STATE';

export const loadState = () => {
	try {
		const serializedState = localStorage.getItem(ID_STATE);
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		return undefined;
	}
};

export const saveState = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem(ID_STATE, serializedState);
	} catch (err) {
		console.log('Error saving data:' + err);
	}
};

const persistedState = loadState();
const store = createStore(reducers, persistedState);
store.subscribe(() => {
	saveState(store.getState());
});

function App() {
	// const
	return (
		<Provider store={store}>
			<div className="App">
				<div>
					<Home />
					<StarWars />
					<Load />
				</div>
			</div>
		</Provider>
	);
}

export default App;
