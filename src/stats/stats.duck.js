import { combineReducers } from 'redux';
import { Observable } from 'rxjs';

import * as service from './stats.service';
import { combineStats } from './combine-stats';
import {
    getTickerCurrencies,
    getProfileInfoBalances,
    getProfileInfoFee,
} from './stats.selectors';

//
// Actions
//
const namespace = 'bitbay/stats/';

const LOAD_CACHED_TICKER_START = `${namespace}LOAD_CACHED_TICKER_START`;
const LOAD_TICKER_START = `${namespace}LOAD_TICKER_START`;
const LOAD_TICKER_SUCCESS = `${namespace}LOAD_TICKER_SUCCESS`;
const LOAD_TICKER_ERROR = `${namespace}LOAD_TICKER_ERROR`;

const LOAD_CACHED_PROFILE_INFO_START = `${namespace}LOAD_CACHED_PROFILE_INFO_START`;
const LOAD_PROFILE_INFO_START = `${namespace}LOAD_PROFILE_INFO_START`;
const LOAD_PROFILE_INFO_SUCCESS = `${namespace}LOAD_PROFILE_INFO_SUCCESS`;
const LOAD_PROFILE_INFO_ERROR = `${namespace}LOAD_PROFILE_INFO_ERROR`;

const UPDATE_COMBINED_INFO_START = `${namespace}UPDATE_COMBINED_INFO_START`;
const UPDATE_COMBINED_INFO_SUCCESS = `${namespace}UPDATE_COMBINED_INFO_SUCCESS`;

const SET_AUTO_UPDATE_PERIOD = `${namespace}SET_AUTO_UPDATE_PERIOD`;

//
// Action creators
//
const loadCachedTickerStart = () => ({ type: LOAD_CACHED_TICKER_START });
const loadTickerStart = () => ({ type: LOAD_TICKER_START });
const loadTickerSuccess = (ticker) => ({ type: LOAD_TICKER_SUCCESS, payload: ticker });
const loadTickerError = (error) => ({ type: LOAD_TICKER_ERROR, payload: error });

const loadCachedProfileInfoStart = () => ({ type: LOAD_CACHED_PROFILE_INFO_START });
const loadProfileInfoStart = () => ({ type: LOAD_PROFILE_INFO_START });
const loadProfileInfoSuccess = (profileInfo) => ({ type: LOAD_PROFILE_INFO_SUCCESS, payload: profileInfo });
const loadProfileInfoError = (error) => ({ type: LOAD_PROFILE_INFO_ERROR, payload: error });

const updateCombinedInfoStart = () => ({ type: UPDATE_COMBINED_INFO_START });
const updateCombinedInfoSuccess = (combinedData) => ({ type: UPDATE_COMBINED_INFO_SUCCESS, payload: combinedData });

const setAutoUpdatePeriod = (period) => ({ type: SET_AUTO_UPDATE_PERIOD, payload: period });

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
        case LOAD_CACHED_TICKER_START:
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

// profileInfo
const profileInfoBalancesReducer = (state = [], action = {}) => {
    switch (action.type) {
        case LOAD_PROFILE_INFO_SUCCESS: {
            return action.payload.balances;
        }
        default: {
            return state;
        }
    }
};

const profileInfoFeeReducer = (state = 0, action = {}) => {
    switch (action.type) {
        case LOAD_PROFILE_INFO_SUCCESS: {
            return action.payload.fee;
        }
        default: {
            return state;
        }
    }
};

const profileInfoFiatReducer = (state = {}, action = {}) => {
    switch (action.type) {
        case LOAD_PROFILE_INFO_SUCCESS: {
            return action.payload.fiat;
        }
        default: {
            return state;
        }
    }
};

const profileInfoLoadingReducer = (state = false, action = {}) => {
    switch (action.type) {
        case LOAD_CACHED_PROFILE_INFO_START:
        case LOAD_PROFILE_INFO_START: {
            return true;
        }
        case LOAD_PROFILE_INFO_ERROR:
        case LOAD_PROFILE_INFO_SUCCESS:{
            return false;
        }
        default: {
            return state;
        }
    }
};

const profileInfoErrorReducer = (state = null, action = {}) => {
    switch (action.type) {
        case LOAD_PROFILE_INFO_SUCCESS: {
            return null;
        }
        case LOAD_PROFILE_INFO_ERROR: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
};

const profileInfoReducer = combineReducers({
    balances: profileInfoBalancesReducer,
    fee: profileInfoFeeReducer,
    fiat: profileInfoFiatReducer,
    loading: profileInfoLoadingReducer,
    error: profileInfoErrorReducer,
});

// combined data (ticker + profileInfo)
const combinedDataReducer = (state = [], action = {}) => {
    switch (action.type) {
        case UPDATE_COMBINED_INFO_SUCCESS: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
};

// autoUpdatePeriod
const autoUpdatePeriodReducer = (state = 120, action = {}) => {
    switch (action.type) {
        case SET_AUTO_UPDATE_PERIOD: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
};

const reducer = combineReducers({
    ticker: tickerReducer,
    profileInfo: profileInfoReducer,
    combined: combinedDataReducer,
    autoUpdatePeriod: autoUpdatePeriodReducer,
});

//
// Epics
//
// ticker
const loadCachedTicker$ = action$ =>
    action$.ofType(LOAD_CACHED_TICKER_START)
        .switchMap(service.getCachedTicker$)
            .map(loadTickerSuccess)
            .catch((err) => Observable.of(loadTickerError(err)));
            
const loadTicker$ = action$ =>
    action$.ofType(LOAD_TICKER_START)
        .switchMap(service.getTicker$)
            .map(loadTickerSuccess)
            .catch((err) => Observable.of(loadTickerError(err)));

const tickerEpics = [
    loadCachedTicker$,
    loadTicker$,
];

// profileInfo
const loadCachedProfileInfo$ = action$ =>
    action$.ofType(LOAD_CACHED_PROFILE_INFO_START)
        .switchMap(service.getCachedProfileInfo$)
            .map(loadProfileInfoSuccess)
            .catch((err) => Observable.of(loadProfileInfoError(err)));

const loadProfileInfo$ = action$ =>
    action$.ofType(LOAD_PROFILE_INFO_START)
        .switchMap(service.getProfileInfo$)
            .map(loadProfileInfoSuccess)
            .catch((err) => Observable.of(loadProfileInfoError(err)));

const profileInfoEpics = [
    loadCachedProfileInfo$,
    loadProfileInfo$,
];

// combined data (ticker + profileInfo)
const combineDataStart$ = action$ =>
    action$.ofType(LOAD_TICKER_SUCCESS, LOAD_PROFILE_INFO_SUCCESS)
        .map(updateCombinedInfoStart);

const combineData$ = (action$, store) =>
    action$.ofType(UPDATE_COMBINED_INFO_START)
        .map(() => {
            const state = store.getState();
            const tickerCurrencies = getTickerCurrencies(state);
            const profileBalances = getProfileInfoBalances(state);
            const profileFee = getProfileInfoFee(state);

            return combineStats(tickerCurrencies, profileBalances, profileFee);
        })
        .map(updateCombinedInfoSuccess)
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
    ...profileInfoEpics,
    ...combinedDataEpics,
];

export {
    reducer,
    epics,

    loadCachedTickerStart,
    loadTickerStart,
    loadCachedProfileInfoStart,
    loadProfileInfoStart,
    setAutoUpdatePeriod,
};
