import React from 'react';
import { connect } from 'react-redux';

import { getProfileInfoFiat } from '../stats.selectors';

const FiatInfo = ({ currency, balance }) => {
    return (
        <div>
            Fiat currency balance: {balance} {currency}
        </div>
    );
};

const mapStateToProps = (state) => {
    const { currency, balance } = getProfileInfoFiat(state);

    return {
        currency,
        balance,
    };
};

export default connect(mapStateToProps)(FiatInfo);
