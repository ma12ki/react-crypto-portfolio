import { get$ } from '../utils/http';

const getTicker$ = () => {
    return get$('ticker/refresh');
};

const getCachedTicker$ = () => {
    return get$('ticker');
};

const getProfileInfo$ = () => {
    return get$('status/refresh')
        .map(mapProfileInfoDtoToModel);
};

const getCachedProfileInfo$ = () => {
    return get$('status')
        .map(mapProfileInfoDtoToModel);
};

const mapProfileInfoDtoToModel = (profileInfo) => {
    profileInfo.balances = profileInfo.balances.map((balance) => {
        balance.transactions = balance.transactions.map((transaction) => {
            transaction.date = new Date(transaction.date);

            return transaction;
        });

        return balance;
    });

    return profileInfo;
};

export {
    getTicker$,
    getCachedTicker$,
    getProfileInfo$,
    getCachedProfileInfo$,
};
