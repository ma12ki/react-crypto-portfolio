import React from 'react';
import { connect } from 'react-redux';

import { loadTickerStart, loadProfileInfoStart } from '../stats.duck';
import {
    getProfileInfoLoading,
    getProfileInfoError,
    getTickerLoading,
    getTickerError,
} from '../stats.selectors';
import { RefreshButton } from '../RefreshButton';
import { AutoUpdate } from '../AutoUpdate';

import './RefreshBar.css';

const mapTickerStateToProps = (state) => ({
    loading: getTickerLoading(state),
    error: getTickerError(state),
});

const mapTickerDispatchToProps = (dispatch) => ({
    refresh: () => dispatch(loadTickerStart()),
});

const TickerRefresh = connect(mapTickerStateToProps, mapTickerDispatchToProps)(RefreshButton);

const mapProfileInfoStateToProps = (state) => ({
    loading: getProfileInfoLoading(state),
    error: getProfileInfoError(state),
});

const mapProfileInfoDispatchToProps = (dispatch) => ({
    refresh: () => dispatch(loadProfileInfoStart()),
});

const ProfileInfoRefresh = connect(mapProfileInfoStateToProps, mapProfileInfoDispatchToProps)(RefreshButton);

const RefreshBar = () => {
    return (
        <div className='RefreshBar'>
            <div className='RefreshBar'>
                <TickerRefresh>Ticker</TickerRefresh>
                <AutoUpdate />
            </div>
            <ProfileInfoRefresh>Stats</ProfileInfoRefresh>
        </div>
    );
};

export default RefreshBar;
