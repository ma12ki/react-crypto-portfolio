import httpFactory from '../utils/httpFactory';

const tickerStorageKey = 'TICKER';

const http = httpFactory('https://api.coinmarketcap.com/v1/');

const getTicker$ = () => http.get$('ticker');

const storeTicker = (tickerData) => localStorage.setItem(tickerStorageKey, tickerData);
const retrieveTicker = () => localStorage.getItem(tickerStorageKey);

export {
    getTicker$,
    storeTicker,
    retrieveTicker,
};
