import { combineEpics } from 'redux-observable';

import { epics as portfolioEpics } from './portfolio';

export const rootEpic = combineEpics(
    ...portfolioEpics,
);
