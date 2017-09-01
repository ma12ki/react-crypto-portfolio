import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { mapPropsStream, compose, createEventHandler } from 'recompose';
import { Observable } from 'rxjs/Rx';

import { getTickerLoading, getAutoUpdatePeriod } from '../stats.selectors';
import { loadTickerStart } from '../stats.duck';
import { Button } from '../Button';
import { AutoUpdatePeriod } from './AutoUpdatePeriod';

import './AutoUpdate.css';

const mapStateToProps = (state) => ({
    loading: getTickerLoading(state),
    period: getAutoUpdatePeriod(state),
});

const { handler: start, stream: start$ } = createEventHandler();
const { handler: stop, stream: stop$ } = createEventHandler();

const mapDispatchToProps = (dispatch) => ({
    refresh: () => dispatch(loadTickerStart()),
    start,
    stop,
});

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    mapPropsStream(
        prop$ => prop$
            .combineLatest(
                Observable.merge(
                    Observable.from(start$).map(() => 'start').startWith('noop'),
                    Observable.from(stop$).map(() => 'stop'),
                ),
                Observable.from(start$)
                    .switchMap(() => Observable.interval(1000).takeUntil(stop$))
                    .startWith(-1),
            )
            // wow, this sucks :(
            .scan((acc, [props, op, interval]) => {
                const { op: prevOp, seconds: prevSeconds, counter: prevCounter } = acc;
                let counting = op === 'start';
                let seconds = counting ? prevSeconds : props.period;
                const startingSeconds = props.period;

                if (op !== prevOp && (op === 'start' || op === 'stop')) {
                    seconds = startingSeconds;
                } else if (counting && prevCounter !== interval) {
                    seconds = prevSeconds - 1;

                    if (seconds < 0) {
                        seconds = startingSeconds;

                        if (!props.loading) {
                            props.refresh();
                        }
                    }
                }

                return {
                    ...props,
                    op,
                    seconds,
                    counting,
                    counter: interval,
                };
            }, {})
    ),
);

const AutoUpdate = ({ counting, seconds, start, stop}) => {
    const action = counting ? stop : start;
    const timer = formatSeconds(seconds);
    const title = counting ? 'stop' : 'start';
    const icon = counting ? '\u25A0' : '\u25B6';

    return (
        <div className='AutoUpdate'>
            <AutoUpdatePeriod />
            <Button onClick={action} title={title}>{icon}{' '}{timer}</Button>
        </div>
    );
};

const formatSeconds = (seconds) => {
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return `${h}`.padStart(2, '0') + ':' +
        `${m}`.padStart(2, '0') + ':' +
        `${s}`.padStart(2, '0');
};

export default enhance(AutoUpdate);
