import React from 'react';
import { connect } from 'react-redux';

import { setAutoUpdatePeriod } from '../../stats.duck';
import { getAutoUpdatePeriod } from '../../stats.selectors';

import './AutoUpdatePeriod.css';

const mapStateToProps = (state) => ({
    period: getAutoUpdatePeriod(state),
});

const mapDispatchToProps = (dispatch) => ({
    setPeriod: (period) => dispatch(setAutoUpdatePeriod(period)),
});

const AutoUpdatePeriod = ({ period, setPeriod }) => {
    return (
        <div className='AutoUpdatePeriod'>
            update every {' '}
            <select defaultValue={period} onChange={(event) => setPeriod(event.target.value)}>
                <option value='60'>1m</option>
                <option value='120'>2m</option>
                <option value='300'>5m</option>
                <option value='600'>10m</option>
                <option value='900'>15m</option>
                <option value='1800'>30m</option>
                <option value='3600'>1h</option>
            </select>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(AutoUpdatePeriod);;
