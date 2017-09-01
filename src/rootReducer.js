import { combineReducers } from 'redux';

import { reducer as statsReducer } from './stats';

export const rootReducer = combineReducers({
    stats: statsReducer,
});
