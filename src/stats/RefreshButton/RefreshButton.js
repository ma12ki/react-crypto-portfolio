import React from 'react';
import classnames from 'classnames';

import { Button } from '../Button';

import './RefreshButton.css';

const RefreshButton = ({ refresh, loading, error, children }) => {
    const iconClassNames = classnames(
        'icon',
        { spin: loading },
    );

    return (
        <Button className='RefreshButton' onClick={refresh} disabled={loading} title={error}>
            <span className={iconClassNames}>&#x21bb;</span>
            {' '}
            {children}
        </Button>
    );
};

export default RefreshButton;
