import {applyMiddleware, createStore} from 'redux';
import {rootReducer} from '../root-reducer';
import thunk from 'redux-thunk';

const middleware = [thunk];

/**
 * Creates the redux store.
 * @param {initialState} initialState the initial state for the redux store.
 * @returns {store} The redux store.
 */
export default function configureStore (initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middleware)
    );

    return store;
}