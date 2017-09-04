import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';

import { getCombinedRows, getCombinedSums } from '../portfolio.selectors';
import { PortfolioItem } from '../PortfolioItem';
import { MultiCurrencyValue } from '../MultiCurrencyValue';
import './PortfolioTable.css';

const PortfolioTable = ({ combinedRows, combinedSums }) => {
    const rows = combinedRows.map((row) => {
        return (
            <PortfolioItem key={row.symbol || Math.random()}
                name={row.name}
                symbol={row.symbol}
                price_usd={row.price_usd}
                price_fiat={row.price_fiat}
                amountOwned={row.amountOwned}
                value_usd={row.value_usd}
                value_fiat={row.value_fiat} />
        );
    });

    return (
        <Table className='PortfolioTable'>
            <thead>
                <tr>
                    <th className='align-center'>Currency</th>
                    <th className='align-center'>Price</th>
                    <th></th>
                    <th className='align-center'>Amount owned</th>
                    <th></th>
                    <th className='align-center'>Value</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
            <tfoot>
                <tr>
                    <td className='align-right' colSpan={5}>&Sigma;</td>
                    <td className='align-right'><MultiCurrencyValue baseValue={combinedSums.value_usd} targetValue={combinedSums.value_fiat} /></td>
                </tr>
            </tfoot>
        </Table>
    );
};

const mapStateToProps = (state) => ({
    combinedRows: getCombinedRows(state),
    combinedSums: getCombinedSums(state),
});

export default connect(mapStateToProps)(PortfolioTable);
