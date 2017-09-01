import { Obervable } from 'rxjs/Observable';

import httpFactory from '../utils/httpFactory';
import { baseCurrency } from '../config';

const storageKeys = {
    targetCurrency: 'TARGET_CURRENCY',
};

const http = httpFactory('https://api.fixer.io/');

const getRate$ = (targetCurrency) => {
    if (targetCurrency === baseCurrency) {
        return Obervable.of({ currency: baseCurrency, rate: 1 });
    }
    return http.get$(`latest?base=${baseCurrency}&symbols=${targetCurrency}`)
        .map((res) => ({ currency: targetCurrency, rate: res.rates[targetCurrency] }));
};

const storeTargetCurrency = (targetCurrency) => localStorage.setItem(storageKeys.targetCurrency, targetCurrency);
const retrieveTargetCurrency = () => localStorage.getItem(storageKeys.targetCurrency) || baseCurrency;

export {
    getRate$,

    storeTargetCurrency,
    retrieveTargetCurrency,
};
