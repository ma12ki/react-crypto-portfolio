import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'reactstrap';

import { setCryptoAmount } from '../portfolio.duck';

const PortfolioItem = ({ name, symbol, price_usd, price_fiat, amountOwned, value_usd, value_fiat, setCryptoAmount }) => {
    return (
        <tr>
            <td title={name}>{symbol}</td>
            <td>{price_usd} {price_fiat}</td>
            <td>x</td>
            <td>
                <Input placeholder='0.0000' type='number' defaultValue={amountOwned} step='0.0001' min='0' onBlur={(e) => setCryptoAmount(symbol, e.target.value)} />
            </td>
            <td>=</td>
            <td>{value_usd} {value_fiat}</td>
        </tr>
    );
};

const mapDispatchToProps = (dispatch) => ({
    setCryptoAmount: (cryptoId, amount) => dispatch(setCryptoAmount(cryptoId, amount)),
});

export default connect(undefined, mapDispatchToProps)(PortfolioItem);
