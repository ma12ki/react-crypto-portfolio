import React, { Component } from 'react';
import { Provider } from 'react-redux';

import './App.css';

import { store } from './configureStore';
import {
  InfoBar,
  RefreshBar,
  StatsTable,

  loadCachedTickerStart,
  loadCachedProfileInfoStart,
} from './stats';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadCachedTickerStart());
    store.dispatch(loadCachedProfileInfoStart());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="App-header">
            <div className="App-content">
              <InfoBar />
            </div>
          </div>
          <div className="App-content">
            <RefreshBar />
            <StatsTable />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
