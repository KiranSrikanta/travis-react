import {applyMiddleware, compose, createStore} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import {rootReducer} from '../root-reducer';
import thunk from 'redux-thunk';

const middleware = [thunk, reduxImmutableStateInvariant()];
let AddDevExtMW = null;

if (window.devToolsExtension) {
    AddDevExtMW = window.devToolsExtension();
} else {
    AddDevExtMW = (devExtMW) => devExtMW;
}

/**
 * Creates the redux store.
 * @param {initialState} initialState the initial state for the redux store.
 * @returns {store} The redux store.
 */
export default function configureStore (initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middleware),
            AddDevExtMW
        )
    );

    return store;
}