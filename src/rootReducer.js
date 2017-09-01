import { combineReducers } from 'redux';

import { reducer as portfolioReducer } from './portfolio';

export const rootReducer = combineReducers({
    portfolio: portfolioReducer,
});
