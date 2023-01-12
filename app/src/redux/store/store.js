import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { save, load } from 'redux-localstorage-simple';

import rootReducer from '../reducers';

const createStoreWithMiddleware = applyMiddleware(
	save({ state: ['data'] }) // Saving done here
)(createStore);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStoreWithMiddleware(
	rootReducer,
	load(),
	composeEnhancers(
		applyMiddleware(thunk, save({ ignoreStates: ['providerDataReducer'] }))
	)
);
