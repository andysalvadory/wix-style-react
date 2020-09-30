import * as React from 'react';

export interface AddressInputProps {
  dataHook?: string;
  className?: string
  clearButton?: boolean,
  initialValue?: string,
  onSelect?: (value) => void,
  debounceDuration?: number,
  onChange?: (value) => void,
  options?: [],
  onClear?: () => void,
  status?: 'loading' | 'error' | 'warning',
  roundInput?: boolean,
  optionsLayout?: 'single-line' | 'double-line',
  showOptionsIcons?: boolean,
  size?: 'small' | 'medium' | 'large',
}

export default class AddressInput extends React.PureComponent<AddressInputProps>{}
