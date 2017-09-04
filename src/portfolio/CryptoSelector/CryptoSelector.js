import React from 'react';
import { connect } from 'react-redux';
import { Input } from 'reactstrap';
import Autocomplete from 'react-autocomplete';

import { selectCrypto } from '../portfolio.duck';
import { getAvailableCurrencies } from '../portfolio.selectors';


class CryptoSelector extends React.PureComponent {
    state = { value: '' };

    constructor(props) {
        super(props);
    }

    matchStateToTerm(item, value) {
        if (!value || value.length < 1) {
            return false;
        }
        const { symbol } = item;

        return symbol.toLowerCase().includes(value.toLowerCase());
    }

    render() {
        const { currencies, select } = this.props;
        const { value } = this.state;

        return (
            <Autocomplete
                getItemValue={(item) => item.symbol}
                items={currencies}
                renderItem={(item, isHighlighted) =>
                    <div style={{ background: isHighlighted ? 'lightgray' : 'white', color: 'black' }}>
                        {item.symbol} - {item.name}
                    </div>
                }
                shouldItemRender={this.matchStateToTerm}
                value={value}
                onChange={(e, value) => this.setState({ value })}
                onSelect={(value) => { select(value); this.setState({ value: '' })}}
                />
            );
    }
}

// const CryptoSelector = ({ currencies, select }) => {
//     return (
//         <Autocomplete
//             getItemValue={(item) => item.symbol}
//             items={currencies}
//             renderItem={(item, isHighlighted) =>
//                 <div style={{ background: isHighlighted ? 'lightgray' : 'white', color: 'black' }}>
//                     {item.symbol} - {item.name}
//                 </div>
//             }
//             //value={value}
//             onChange={(e) => console.log(e.target.value)}
//             onSelect={(val) => console.log(val)}
//             />
//         );
// };

const mapStateToProps = (state) => ({
    currencies: getAvailableCurrencies(state),
});

const mapDispatchToProps = (dispatch) => ({
    select: (cryptoId) => dispatch(selectCrypto(cryptoId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CryptoSelector);