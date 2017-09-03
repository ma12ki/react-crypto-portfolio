import { combineReducers } from 'redux';
import { Observable } from 'rxjs';

import { baseCurrency } from '../config';
import * as cryptoService from './crypto.service';
import * as fiatService from './fiat.service';
import combineData from './combine-data';
import {
    getTickerCurrencies,
    getSelectedCryptos,
    getCryptoAmounts,
    getRateValue,
} from './portfolio.selectors';

//
// Actions
//
const namespace = 'portfolio/';

const LOAD_TICKER_START = `${namespace}LOAD_TICKER_START`;
const LOAD_TICKER_SUCCESS = `${namespace}LOAD_TICKER_SUCCESS`;
const LOAD_TICKER_ERROR = `${namespace}LOAD_TICKER_ERROR`;

const SET_RATE_CURRENCY = `${namespace}SET_RATE_CURRENCY`;
const LOAD_RATE_START = `${namespace}LOAD_RATE_START`;
const LOAD_RATE_SUCCESS = `${namespace}LOAD_RATE_SUCCESS`;
const LOAD_RATE_ERROR = `${namespace}LOAD_RATE_ERROR`;

const SET_CRYPTO_AMOUNT = `${namespace}SET_CRYPTO_AMOUNT`;

const SELECT_CRYPTO = `${namespace}SELECT_CRYPTO`;
const UNSELECT_CRYPTO = `${namespace}UNSELECT_CRYPTO`;

const UPDATE_COMBINED_DATA_START = `${namespace}UPDATE_COMBINED_DATA_START`;
const UPDATE_COMBINED_DATA_SUCCESS = `${namespace}UPDATE_COMBINED_DATA_SUCCESS`;

//
// Action creators
//
const loadTickerStart = () => ({ type: LOAD_TICKER_START });
const loadTickerSuccess = (ticker) => ({ type: LOAD_TICKER_SUCCESS, payload: ticker });
const loadTickerError = (error) => ({ type: LOAD_TICKER_ERROR, payload: error });

const setRateCurrency = (currency) => ({ type: SET_RATE_CURRENCY, payload: currency });
const loadRateStart = (currency) => ({ type: LOAD_RATE_START, payload: currency });
const loadRateSuccess = (currency, rate) => ({ type: LOAD_RATE_SUCCESS, payload: { currency, rate } });
const loadRateError = (error) => ({ type: LOAD_RATE_ERROR, payload: error });

const setCryptoAmount = (cryptoId, amount) => ({ type: SET_CRYPTO_AMOUNT, payload: { cryptoId, amount: Number(amount) } });

const selectCrypto = (cryptoId) => ({ type: SELECT_CRYPTO, payload: cryptoId });
const unselectCrypto = (cryptoId) => ({ type: UNSELECT_CRYPTO, payload: cryptoId });

const updateCombinedDataStart = () => ({ type: UPDATE_COMBINED_DATA_START });
const updateCombinedDataSuccess = (combinedData) => ({ type: UPDATE_COMBINED_DATA_SUCCESS, payload: combinedData });

//
// Reducers
//
// ticker
const tickerCurrenciesReducer = (state = [], action = {}) => {
    switch (action.type) {
        case LOAD_TICKER_SUCCESS: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
};

const tickerLoadingReducer = (state = false, action = {}) => {
    switch (action.type) {
        case LOAD_TICKER_START: {
            return true;
        }
        case LOAD_TICKER_ERROR:
        case LOAD_TICKER_SUCCESS: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const tickerErrorReducer = (state = null, action = {}) => {
    switch (action.type) {
        case LOAD_TICKER_SUCCESS: {
            return null;
        }
        case LOAD_TICKER_ERROR: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
};

const tickerReducer = combineReducers({
    currencies: tickerCurrenciesReducer,
    loading: tickerLoadingReducer,
    error: tickerErrorReducer,
});

// rate
const rateCurrencyReducer = (state = baseCurrency, action = {}) => {
    switch (action.type) {
        case SET_RATE_CURRENCY: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
};

const rateValueReducer = (state = 1, action = {}) => {
    switch (action.type) {
        case LOAD_RATE_SUCCESS: {
            return action.payload.rate;
        }
        default: {
            return state;
        }
    }
};

const rateLoadingReducer = (state = false, action = {}) => {
    switch (action.type) {
        case LOAD_RATE_START: {
            return true;
        }
        case LOAD_RATE_ERROR:
        case LOAD_RATE_SUCCESS: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const rateErrorReducer = (state = null, action = {}) => {
    switch (action.type) {
        case LOAD_RATE_SUCCESS: {
            return null;
        }
        case LOAD_RATE_ERROR: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
};

const rateReducer = combineReducers({
    currency: rateCurrencyReducer,
    value: rateValueReducer,
    loading: rateLoadingReducer,
    error: rateErrorReducer,
});

// crypto amount
const cryptoAmountsReducer = (state = {}, action = {}) => {
    switch (action.type) {
        case SET_CRYPTO_AMOUNT: {
            return {
                ...state,
                [action.payload.cryptoId]: action.payload.amount,
            };
        }
        default: {
            return state;
        }
    }
};

// selected cryptos
const selectedCryptosReducer = (state = [], action = {}) => {
    switch (action.type) {
        case SELECT_CRYPTO: {
            return [
                ...state,
                action.payload,
            ];
        }
        case UNSELECT_CRYPTO: {
            return state.filter((id) => id !== action.payload);
        }
        default: {
            return state;
        }
    }
};

// combined data (ticker + profileInfo)
const combinedDataReducer = (state = {}, action = {}) => {
    switch (action.type) {
        case UPDATE_COMBINED_DATA_SUCCESS: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
};

const reducer = combineReducers({
    ticker: tickerReducer,
    rate: rateReducer,
    cryptoAmounts: cryptoAmountsReducer,
    selectedCryptos: selectedCryptosReducer,
    combined: combinedDataReducer,
});

//
// Epics
//
// ticker
const loadTicker$ = action$ =>
    action$.ofType(LOAD_TICKER_START)
        .switchMap(cryptoService.getTicker$)
            .map(loadTickerSuccess)
            .catch((err) => Observable.of(loadTickerError(err)));

const tickerEpics = [
    loadTicker$,
];

// rate
const loadRate$ = action$ =>
    action$.ofType(LOAD_RATE_START)
        .switchMap(({ payload }) => fiatService.getRate$(payload))
            .map(({ currency, rate }) => loadRateSuccess(currency, rate))
            .catch((err) => Observable.of(loadRateError(err)));

const rateEpics = [
    loadRate$,
];

// crypto amounts
const storeCryptoAmounts$ = (action$, store) =>
    action$.ofType(SET_CRYPTO_AMOUNT)
        .do(() => {
            const state = store.getState();
            const cryptoAmounts = getCryptoAmounts(state);
            cryptoService.storeCryptoAmounts(cryptoAmounts);
        })
        .map(() => ({ type: 'NOOP' }));

const cryptoAmountsEpics = [
    storeCryptoAmounts$,
];

// selected cryptos
const storeSelectedCryptos$ = (action$, store) =>
    action$.ofType(SELECT_CRYPTO, UNSELECT_CRYPTO)
        .do(() => {
            const state = store.getState();
            const selectedCryptos = getSelectedCryptos(state);
            cryptoService.storeSelectedCryptos(selectedCryptos);
        })
        .map(() => ({ type: 'NOOP' }));

const selectedCryptosEpics = [
    storeSelectedCryptos$,
];

// combined data (ticker + profileInfo)
const combineDataStart$ = action$ =>
    action$.ofType(LOAD_TICKER_SUCCESS, LOAD_RATE_SUCCESS, SET_CRYPTO_AMOUNT)
        .map(updateCombinedDataStart);

const combineData$ = (action$, store) =>
    action$.ofType(UPDATE_COMBINED_DATA_START)
        .map(() => {
            const state = store.getState();
            const ticker = getTickerCurrencies(state);
            const selectedCryptos = getSelectedCryptos(state);
            const cryptoAmounts = getCryptoAmounts(state);
            const fiatRate = getRateValue(state);

            return combineData(selectedCryptos, cryptoAmounts, ticker, fiatRate);
        })
        .map(updateCombinedDataSuccess)
        .catch((err) => {
            console.error(err);
            return Observable.of({ type: 'NOOP' });
        });

const combinedDataEpics = [
    combineDataStart$,
    combineData$,
];

const epics = [
    ...tickerEpics,
    ...rateEpics,
    ...cryptoAmountsEpics,
    ...selectedCryptosEpics,
    ...combinedDataEpics,
];

export {
    reducer,
    epics,

    loadTickerStart,
    loadRateStart,

    setCryptoAmount,

    setRateCurrency,

    selectCrypto,
    unselectCrypto,
};
