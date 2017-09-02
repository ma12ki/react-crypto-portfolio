const combine = (selectedCryptos, cryptoAmounts, ticker, fiatRate) => {
    const rows = selectedCryptos.map((cryptoId) => {
        const cryptoData = ticker.find((crypto) => crypto.symbol === cryptoId) || {};
        const amount = cryptoAmounts[cryptoData.symbol] || 0;

        cryptoData.price_fiat = cryptoData.price_usd * fiatRate;
        cryptoData.value_usd = cryptoData.price_usd * amount;
        cryptoData.value_fiat = cryptoData.price_fiat * amount;

        return cryptoData;
    });

    console.log(rows);

    const sums = rows.reduce((currentSums, row) => {
        return {
            value_fiat: currentSums.value_fiat + row.value_fiat,
        };
    }, { value_fiat: 0 });

    return {
        rows,
        sums,
    };
};

export default combine;
