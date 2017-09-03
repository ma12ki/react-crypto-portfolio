import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';

import { getCombinedRows, getCombinedSums } from '../portfolio.selectors';
import { PortfolioItem } from '../PortfolioItem';

const PortfolioTable = ({ combinedRows, combinedSums }) => {
    const rows = combinedRows.map((row) => {
        return (
            <PortfolioItem key={row.symbol}
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
        <Table>
            <thead>
                <tr>
                    <th>Currency</th>
                    <th>Price</th>
                    <th></th>
                    <th>Amount owned</th>
                    <th></th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={5}>&Sigma;</td>
                    <td>{combinedSums.value_usd} {combinedSums.value_fiat}</td>
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
