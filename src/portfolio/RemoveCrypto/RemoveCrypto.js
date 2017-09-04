import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import { unselectCrypto } from '../portfolio.duck';
import './RemoveCrypto.css';

const RemoveCrypto = ({ cryptoId, remove }) => {
    return (
        <Button color='secondary' className='RemoveCrypto' onClick={() => remove(cryptoId)}>&#128465;</Button>
    );
};

const mapDispatchToProps = (dispatch) => ({
    remove: (cryptoId) => dispatch(unselectCrypto(cryptoId)),
});

export default connect(undefined, mapDispatchToProps)(RemoveCrypto);
