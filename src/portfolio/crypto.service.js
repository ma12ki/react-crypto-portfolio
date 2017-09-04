import httpFactory from '../utils/httpFactory';
import localStorageJSON from '../utils/localStorageJSON';

const storageKeys = {
    ticker: 'TICKER',
    selectedCryptos: 'SELECTED_CRYPTOS',
    cryptoAmounts: 'CRYPTO_AMOUNTS',
};

const http = httpFactory('https://api.coinmarketcap.com/v1/');

const getTicker$ = () => http.get$('ticker/')
    .map((res) => {
        res.map((row) => {
            row.price_usd = Number(row.price_usd);
            return row;
        });
        return res;
    });

const storeTicker = (tickerData) => localStorageJSON.setItem(storageKeys.ticker, tickerData);
const retrieveTicker = () => localStorageJSON.getItem(storageKeys.ticker);

const storeSelectedCryptos = (selectedCryptos) => localStorageJSON.setItem(storageKeys.selectedCryptos, selectedCryptos);
const retrieveSelectedCryptos = () => localStorageJSON.getItem(storageKeys.selectedCryptos) || [];

const storeCryptoAmounts = (cryptoAmounts) => localStorageJSON.setItem(storageKeys.cryptoAmounts, cryptoAmounts);
const retrieveCryptoAmounts = () => localStorageJSON.getItem(storageKeys.cryptoAmounts) || {};

export {
    getTicker$,

    storeTicker,
    retrieveTicker,

    storeSelectedCryptos,
    retrieveSelectedCryptos,

    storeCryptoAmounts,
    retrieveCryptoAmounts,
};
