import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers/rootReducer';

const initialState = {};

const middleware = [thunk, createLogger()];

//https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
//allowes for browsers with and without the dev tools installed
const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
        applyMiddleware(...middleware),
    )
);

export default store;
