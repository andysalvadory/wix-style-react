import React from 'react';
import PropTypes from 'prop-types';

import Text from '../../Text';
import { dataHooks } from '../constants';
import { formatToCompactNumber } from '../../utils/numberFormatters';

import { classes } from './FunnelLabel.st.css';

export const FunnelLabel = ({ value, label }) => {
  const compactNumber = value ? formatToCompactNumber(value, 1) : '-';
  return (
    <div className={classes.root}>
      <Text dataHook={dataHooks.labelValue} weight="bold" ellipsis>
        {compactNumber}
      </Text>
      <Text dataHook={dataHooks.labelText} size="small" secondary ellipsis>
        {label}
      </Text>
    </div>
  );
};

FunnelLabel.propTypes = {
  /** Label's value */
  value: PropTypes.number,

  /** Label's content */
  label: PropTypes.string.isRequired,
};
