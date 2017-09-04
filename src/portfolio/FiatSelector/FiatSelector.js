import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { setRateCurrency } from '../portfolio.duck';
import { getRateCurrency } from '../portfolio.selectors';

const currencies = ['USD', 'PLN', 'EUR', 'GBP', 'CHF'];

class FiatSelector extends React.PureComponent {
    state = {
        dropdownOpen: false,
    }

    toggle = () => {
        this.setState({ dropdownOpen: !this.state.dropdownOpen });
    }

    render() {
        const { currency, select } = this.props;
        const { dropdownOpen } = this.state;

        const items = currencies.map((code) => (<DropdownItem key={code} disabled={currency === code} onClick={() => select(code)}>{code}</DropdownItem>));
        
        return (
            <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                    {currency}
                </DropdownToggle>
                <DropdownMenu>
                    {items}
                </DropdownMenu>
            </Dropdown>
        );
    }
}

const mapStateToProps = (state) => ({
    currency: getRateCurrency(state),
});

const mapDispatchToProps = (dispatch) => ({
    select: (currency) => dispatch(setRateCurrency(currency)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FiatSelector);
