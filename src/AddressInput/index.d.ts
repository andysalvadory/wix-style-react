import * as React from 'react';
import { DropdownLayoutOption } from '../DropdownLayout';

export interface AddressInputProps {
  dataHook?: string;
  className?: string
  clearButton?: boolean,
  initialValue?: string,
  onSelect?: (value: DropdownLayoutValueOption) => void,
  debounceDuration?: number,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  options?: DropdownLayoutOption[],
  onClear?: () => void,
  status?: 'loading' | 'error' | 'warning',
  roundInput?: boolean,
  optionsLayout?: 'single-line' | 'double-line',
  showOptionsIcons?: boolean,
  size?: 'small' | 'medium' | 'large',
}

export default class AddressInput extends React.PureComponent<AddressInputProps>{}
