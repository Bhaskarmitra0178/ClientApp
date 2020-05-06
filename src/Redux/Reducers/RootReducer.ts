import { combineReducers } from 'redux';
import UserReducer from './ChildReducers/UserReducer';

/**
 * Root Reducer
 */
export default combineReducers({
    user: UserReducer
});