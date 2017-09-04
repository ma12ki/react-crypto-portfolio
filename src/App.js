import React, { Component } from 'react';
import { Provider } from 'react-redux';

import './App.css';

import { store } from './configureStore';
import {
  getRateCurrency,
  loadRateStart,
  loadTickerStart,
} from './portfolio';
import { PortfolioTable, CryptoSelector, FiatSelector } from './portfolio';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadTickerStart());
    const targetCurrency = getRateCurrency(store.getState());
    store.dispatch(loadRateStart(targetCurrency));
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="App-header">
            <div className="App-content App-content-header">
              <CryptoSelector />
              <FiatSelector />
            </div>
          </div>
          <div className="App-content">
            <PortfolioTable />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
