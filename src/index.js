import React from 'react';
import ReactDOM from 'react-dom';
import { setObservableConfig } from 'recompose';
import rxjsconfig from 'recompose/rxjsObservableConfig';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

setObservableConfig(rxjsconfig);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
