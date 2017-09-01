import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { rootReducer } from './rootReducer';
import { rootEpic } from './rootEpic';
import {
    retrieveCryptoAmounts,
    retrieveSelectedCryptos,
    retrieveTargetCurrency,
} from './portfolio';

const preloadedState = {
    portfolio: {
        rate: {
            currency: retrieveTargetCurrency(),
        },
        selectedCryptos: retrieveSelectedCryptos(),
        cryptoAmounts: retrieveCryptoAmounts(),
    },
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = createEpicMiddleware(rootEpic);
const middlewares = applyMiddleware(epicMiddleware);

export const store = createStore(rootReducer, preloadedState, composeEnhancers(middlewares));
