import {combineReducers} from "redux";
import user from './userReducer';
import notes from './notesReducer';

const reducers = combineReducers({
	user,
	notes
});

export default reducers;