import { withProps } from 'recompose';

import { NumberCell } from './NumberCell';

const CryptoCell = withProps({
    fractionDigits: 6,
})(NumberCell);

export { CryptoCell };
