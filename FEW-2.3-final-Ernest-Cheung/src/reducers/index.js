import { combineReducers } from 'redux';
import saveReducer from './CharacterReducer';

export default combineReducers({
	saves: saveReducer,
});
