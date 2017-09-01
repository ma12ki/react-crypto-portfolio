import React from 'react';
import { connect } from 'react-redux';

import { getCombined } from '../stats.selectors';
import { CryptoCell, FiatCell } from './cells';

import './StatsTable.css';

const StatsTable = ({ combined }) => {
    const rows = combined.map((row) => {
        return (
            <tr key={row.currency}>
                <td className='align-center'>{row.currency}</td>
                <CryptoCell>{row.balance}</CryptoCell>
                <CryptoCell>{row.boughtAmount}</CryptoCell>
                <FiatCell>{row.boughtValue}</FiatCell>
                <FiatCell>{row.avgBoughtRate}</FiatCell>
                <CryptoCell>{row.soldAmount}</CryptoCell>
                <FiatCell>{row.soldValue}</FiatCell>
                <FiatCell>{row.avgSoldRate}</FiatCell>
                <FiatCell>{row.gain}</FiatCell>
                <FiatCell>{row.rate}</FiatCell>
                <FiatCell>{row.potentialValue}</FiatCell>
                <FiatCell>{row.returnPercent}</FiatCell>
                <FiatCell>{row.potentialTotalGain}</FiatCell>
            </tr>
        );
    });

    return (
        <table className='StatsTable'>
            <thead>
                <tr>
                    <th colSpan={2}>Currency</th>
                    <th colSpan={3}>Bought</th>
                    <th colSpan={3}>Sold</th>
                    <th rowSpan={2} title='Sold value - bought value'>Gain</th>
                    <th rowSpan={2}>Current rate</th>
                    <th colSpan={3}>Projection</th>
                </tr>
                <tr>
                    <th>Symbol</th>
                    <th>Balance</th>
                    <th>Amount</th>
                    <th>Value</th>
                    <th title='Value / amount'>Avg rate</th>
                    <th>Amount</th>
                    <th>Value</th>
                    <th title='Value / amount'>Avg rate</th>
                    <th title='Current rate * balance * (100 - fee)%'>Value</th>
                    <th title='Current rate / avg sold rate'>Return [%]</th>
                    <th title='Value + gain'>Return</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
            <tfoot>
                <tr>
                    <td>&Sigma;</td>
                    <td colSpan={2}></td>
                    <FiatCell>{getSum(combined, 'boughtValue')}</FiatCell>
                    <td colSpan={2}></td>
                    <FiatCell>{getSum(combined, 'soldValue')}</FiatCell>
                    <td></td>
                    <FiatCell>{getSum(combined, 'gain')}</FiatCell>
                    <td></td>
                    <FiatCell>{getSum(combined, 'potentialValue')}</FiatCell>
                    <td></td>
                    <FiatCell>{getSum(combined, 'potentialTotalGain')}</FiatCell>
                </tr>
            </tfoot>
        </table>
    );
};

const getSum = (rows, column) => {
    return rows.reduce((sum, row) => {
        return sum + row[column];
    }, 0);
};

const mapStateToProps = (state) => ({
    combined: getCombined(state),
});

export default connect(mapStateToProps)(StatsTable);
