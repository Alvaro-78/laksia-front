import { combineReducers } from 'redux';
import { providerDataReducer } from './providerDataReducers';
import { customerReducer } from './customerReducers';
import { roomReducer } from './roomReducers';
import { concertReducer } from './concertReducers';
import { assetReducer } from './assetReducers';

export default combineReducers({
	providerDataReducer,
	customerReducer,
	roomReducer,
	concertReducer,
	assetReducer,
});
