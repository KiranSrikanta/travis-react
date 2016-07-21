import {combineReducers} from 'redux';
import todoReducer from './todo/reducers/todo-reducer';

export const rootReducer = combineReducers({todoReducer});

export default rootReducer;