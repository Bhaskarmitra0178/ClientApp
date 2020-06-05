import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './Reducers/RootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

/**
 * Configure store.
 * @param initialState 
 */
export default function configureStore(initialState = {}) {
    return createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunk))
    );
}