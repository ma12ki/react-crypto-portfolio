const getStats = (state) => state.stats || {};

const getTicker = (state) => getStats(state).ticker || {};
const getTickerCurrencies = (state) => getTicker(state).currencies || {};
const getTickerLoading = (state) => getTicker(state).loading || false;
const getTickerError = (state) => getTicker(state).error || null;

const getProfileInfo = (state) => getStats(state).profileInfo || {};
const getProfileInfoBalances = (state) => getProfileInfo(state).balances || [];
const getProfileInfoFee = (state) => getProfileInfo(state).fee || 0;
const getProfileInfoFiat = (state) => getProfileInfo(state).fiat || {};
const getProfileInfoLoading = (state) => getProfileInfo(state).loading || false;
const getProfileInfoError = (state) => getProfileInfo(state).error || null;

const getCombined = (state) => getStats(state).combined || [];

const getAutoUpdatePeriod = (state) => getStats(state).autoUpdatePeriod || 120;

export {
    getStats,
    
    getTicker,
    getTickerCurrencies,
    getTickerLoading,
    getTickerError,

    getProfileInfo,
    getProfileInfoBalances,
    getProfileInfoFee,
    getProfileInfoFiat,
    getProfileInfoLoading,
    getProfileInfoError,

    getCombined,

    getAutoUpdatePeriod,
};
