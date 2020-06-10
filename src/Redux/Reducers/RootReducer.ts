import { combineReducers } from 'redux';
import UserReducer from './ChildReducers/UserReducer';
import AppDetailsReducer from './ChildReducers/AppDetailsReducer';

/**
 * Root Reducer
 */
export default combineReducers({
    user: UserReducer,
    applicationData: AppDetailsReducer
});