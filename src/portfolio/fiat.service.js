import httpFactory from '../utils/httpFactory';

const http = httpFactory('https://api.fixer.io/');

const getRate$ = (targetCurrency) => http.get$(`latest?base=USD&symbols=${targetCurrency}`)
    .map((res) => ({ currency: targetCurrency, rate: res.rates[targetCurrency] }));

const storeTicker = (tickerData) => localStorage.setItem(tickerStorageKey, tickerData);
const retrieveTicker = () => localStorage.getItem(tickerStorageKey);

export {
    getRate$,
};
