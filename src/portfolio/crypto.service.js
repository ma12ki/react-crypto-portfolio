import httpFactory from '../utils/httpFactory';

const storageKeys = {
    ticker: 'TICKER',
    selectedCryptos: 'SELECTED_CRYPTOS',
    cryptoAmounts: 'CRYPTO_AMOUNTS',
};

const http = httpFactory('https://api.coinmarketcap.com/v1/');

const getTicker$ = () => http.get$('ticker');

const storeTicker = (tickerData) => localStorage.setItem(storageKeys.ticker, tickerData);
const retrieveTicker = () => localStorage.getItem(storageKeys.ticker);

const storeSelectedCryptos = (selectedCryptos) => localStorage.setItem(storageKeys.selectedCryptos, selectedCryptos);
const retrieveSelectedCryptos = () => localStorage.getItem(storageKeys.selectedCryptos) || [];

const storeCryptoAmounts = (cryptoAmounts) => localStorage.setItem(storageKeys.cryptoAmounts, cryptoAmounts);
const retrieveCryptoAmounts = () => localStorage.getItem(storageKeys.cryptoAmounts) || {};

export {
    getTicker$,

    storeTicker,
    retrieveTicker,

    storeSelectedCryptos,
    retrieveSelectedCryptos,

    storeCryptoAmounts,
    retrieveCryptoAmounts,
};
