import { withProps } from 'recompose';

import { NumberCell } from './NumberCell';

const FiatCell = withProps({
    fractionDigits: 2,
})(NumberCell);

export { FiatCell };