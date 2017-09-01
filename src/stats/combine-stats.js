const combineStats = (tickerCurrencies, profileBalances, profileFee) => {
    const feePercent = profileFee / 100;
    return profileBalances.map((row) => {
        row.avgBoughtRate = row.boughtAmount ? row.boughtValue / row.boughtAmount : null;
        row.avgSoldRate = row.soldAmount ? row.soldValue / row.soldAmount : null;
        row.gain = row.soldValue - row.boughtValue;
        row.rate = (tickerCurrencies[row.currency] || {}).bid;
        row.potentialValue = row.rate * row.balance * (1 - (feePercent));
        row.potentialTotalGain = row.potentialValue + row.gain;
        row.returnPercent = row.potentialValue / row.boughtValue * 100 - 100;

        return row;
    });
};

export {
    combineStats,
};
