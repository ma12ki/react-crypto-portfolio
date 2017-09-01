import React from 'react';
import classnames from 'classnames';

import './Button.css';

const Button = ({ children, className, ...rest }) => {
    const classNames = classnames(
        'Button',
        className,
    );

    return (
        <button className={classNames} {...rest}>
            {children}
        </button>
    );
};

export default Button;
