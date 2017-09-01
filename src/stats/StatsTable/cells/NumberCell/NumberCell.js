import React from 'react';
import { lifecycle } from 'recompose';

import './NumberCell.css';

const getValueClassName = (value) => {
    if (value > 0) {
        return 'positive';
    }
    if (value < 0) {
        return 'negative';
    }
    return 'neutral';
};

const getChangeClassName = (oldVal, newVal) => {
    if (newVal > oldVal) {
        return 'up';
    }
    if (newVal < oldVal) {
        return 'down';
    }
    return 'noChange';
};

const NumberCell = ({ fractionDigits = 2, children, change, ...rest }) => {
    const value = children != null ? children.toLocaleString(undefined, {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
    }) : 'N/A';

    const valueClassName = getValueClassName(children);

    return (<td {...rest} className={'NumberCell-' + change}><span className={'NumberCell-' + valueClassName}>{value}</span></td>);
};

const enhance = lifecycle({
    componentWillReceiveProps(nextProps) {
        this.setState({
            change: getChangeClassName(this.props.children, nextProps.children),
        });
    }
});

export default enhance(NumberCell);
