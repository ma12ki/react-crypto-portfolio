import React from 'react';
import { connect } from 'react-redux';

import { baseCurrency } from '../../config';
import { getRateCurrency } from '../portfolio.selectors';
import './MultiCurrencyValue.css';

const MultiCurrencyValue = ({ baseCurrency, targetCurrency, baseValue, targetValue }) => {
    const differentCurrency = baseCurrency !== targetCurrency;
    const baseValueFormatted = formatNumber(baseValue);
    const targetValueFormatted = formatNumber(targetValue);

    return (
        <div>
            <div className='MultiCurrencyValue-target'>{targetValueFormatted} <span className='MultiCurrencyValue-currency'>{targetCurrency}</span></div>
            {differentCurrency ? <div className='MultiCurrencyValue-base'>{baseValueFormatted} <span className='MultiCurrencyValue-currency'>{baseCurrency}</span></div> : ''}
        </div>
    );
};

const formatNumber = (value) => (value || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const mapStateToProps = (state) => ({
    targetCurrency: getRateCurrency(state),
    baseCurrency,
});

export default connect(mapStateToProps)(MultiCurrencyValue);
