import React from 'react';

import { FiatInfo } from '../FiatInfo';
import { FeeInfo } from '../FeeInfo';

import './InfoBar.css';

export default () => {
    return (
        <div className='InfoBar'>
            <FiatInfo />
            <FeeInfo />
        </div>
    );
};
