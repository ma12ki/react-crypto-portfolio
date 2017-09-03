const combine = (selectedCryptos, cryptoAmounts, ticker, fiatRate) => {
    const rows = selectedCryptos.map((cryptoId) => {
        const cryptoData = ticker.find((crypto) => crypto.symbol === cryptoId) || {};
        const amount = cryptoAmounts[cryptoData.symbol] || 0;

        cryptoData.amountOwned = amount;
        cryptoData.price_fiat = cryptoData.price_usd * fiatRate;
        cryptoData.value_usd = cryptoData.price_usd * amount;
        cryptoData.value_fiat = cryptoData.price_fiat * amount;

        return cryptoData;
    });

    const sums = rows.reduce((currentSums, row) => {
        return {
            value_usd: currentSums.value_usd + row.value_usd,
            value_fiat: currentSums.value_fiat + row.value_fiat,
        };
    }, { value_usd: 0, value_fiat: 0 });

    return {
        rows,
        sums,
    };
};

export default combine;
