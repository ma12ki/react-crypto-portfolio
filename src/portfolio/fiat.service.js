import httpFactory from '../utils/httpFactory';

import { baseCurrency } from '../config';

const http = httpFactory('https://api.fixer.io/');

const getRate$ = (targetCurrency) => http.get$(`latest?base=${baseCurrency}&symbols=${targetCurrency}`)
    .map((res) => ({ currency: targetCurrency, rate: res.rates[targetCurrency] }));

export {
    getRate$,
};
