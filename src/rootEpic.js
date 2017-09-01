import { combineEpics } from 'redux-observable';

import { epics as statsEpics } from './stats';

export const rootEpic = combineEpics(
    ...statsEpics,
);
