import { baseCurrency } from '../config';

const getPortfolio = (state) => state.portfolio || {};

const getTicker = (state) => getPortfolio(state).ticker || {};
const getTickerCurrencies = (state) => getTicker(state).currencies || {};
const getTickerLoading = (state) => getTicker(state).loading || false;
const getTickerError = (state) => getTicker(state).error || null;

const getRate = (state) => getPortfolio(state).rate || {};
const getRateCurrency = (state) => getRate(state).currency || baseCurrency;
const getRateValue = (state) => getRate(state).value || 1;
const getRateLoading = (state) => getRate(state).loading || false;
const getRateError = (state) => getRate(state).error || null;

const getSelectedCryptos = (state) => getPortfolio(state).selectedCryptos || [];
const getSelectedCryptosDetails = (state) => {
    const ticker = getTickerCurrencies(state);
    const selectedCryptos = getSelectedCryptos(state);

    return selectedCryptos.map((id) => ticker.find((currency) => currency.symbol === id));
};

const getCrypto = (state, cryptoId) => getTickerCurrencies(state)
    .find((crypto) => crypto.symbol === cryptoId) || {};

const getCryptoAmounts = (state) => getPortfolio(state).cryptoAmounts || {};
const getCryptoAmount = (state, cryptoId) => getCryptoAmounts(state)[cryptoId] || 0;

const getCombined = (state) => getPortfolio(state).combined || {};
const getCombinedRows = (state) => getCombined(state).rows || [];
const getCombinedSums = (state) => getCombined(state).sums || {};

export {
    getPortfolio,
    
    getTicker,
    getTickerCurrencies,
    getTickerLoading,
    getTickerError,

    getRate,
    getRateCurrency,
    getRateValue,
    getRateLoading,
    getRateError,

    getSelectedCryptos,
    getSelectedCryptosDetails,

    getCrypto,

    getCryptoAmounts,
    getCryptoAmount,

    getCombined,
    getCombinedRows,
    getCombinedSums,
};
