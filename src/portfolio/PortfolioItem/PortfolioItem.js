import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'reactstrap';

import { setCryptoAmount } from '../portfolio.duck';
import { MultiCurrencyValue } from '../MultiCurrencyValue';
import { RemoveCrypto } from '../RemoveCrypto';

const PortfolioItem = ({ name, symbol, price_usd, price_fiat, amountOwned, value_usd, value_fiat, setCryptoAmount }) => {
    return (
        <tr>
            <td className='align-center' title={name}>{symbol}</td>
            <td className='align-right'><MultiCurrencyValue baseValue={price_usd} targetValue={price_fiat} /></td>
            <td className='align-center'>x</td>
            <td className='align-center'>
                <Input placeholder='0.0000' type='number' defaultValue={amountOwned} step='0.0001' min='0' onBlur={(e) => setCryptoAmount(symbol, e.target.value)} />
            </td>
            <td className='align-center'>=</td>
            <td className='align-right'><MultiCurrencyValue baseValue={value_usd} targetValue={value_fiat} /></td>
            <td className='align-center'>
                <RemoveCrypto cryptoId={symbol} />
            </td>
        </tr>
    );
};

const mapDispatchToProps = (dispatch) => ({
    setCryptoAmount: (cryptoId, amount) => dispatch(setCryptoAmount(cryptoId, amount)),
});

export default connect(undefined, mapDispatchToProps)(PortfolioItem);
