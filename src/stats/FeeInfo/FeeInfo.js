import React from 'react';
import { connect } from 'react-redux';

import { getProfileInfoFee } from '../stats.selectors';

const FeeInfo = ({ fee }) => {
    return (
        <div>
            Fee: {fee}%
        </div>
    );
};

const mapStateToProps = (state) => ({
    fee: getProfileInfoFee(state),
});

export default connect(mapStateToProps)(FeeInfo);
