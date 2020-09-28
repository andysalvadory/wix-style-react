import React from 'react';
import PropTypes from 'prop-types';

import InputWithOptions from '../InputWithOptions';
import SearchIcon from 'wix-ui-icons-common/Search';
import { st, classes } from './AddressInput.st.css';
import debounce from 'lodash/debounce';
import { dataHooks } from './constants';
import Input from '../Input';

/** AddressInput */
class AddressInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: props.initialValue || '',
    };
  }

  _onChange = value => {
    const { onChange } = this.props;
    onChange && onChange(value);
  };

  _debouncedOnChange = debounce(this._onChange, this.props.debounceDuration);

  _onInputChange = ({ target: { value } }) => {
    this.setState({
      inputValue: value,
    });
    this._debouncedOnChange(value);
  };

  _onSelect = value => {
    const { onSelect } = this.props;
    this.setState({
      inputValue: value.value,
    });
    onSelect && onSelect(value);
  };

  render() {
    const {
      dataHook,
      className,
      size,
      roundInput,
      clearButton,
      options,
    } = this.props;

    return (
      <InputWithOptions
        dataHook={dataHook}
        className={className}
        clearButton={clearButton}
        onChange={this._onInputChange}
        size={size}
        options={options}
        onSelect={this._onSelect}
        value={this.state.inputValue}
        prefix={
          <Input.IconAffix>
            <SearchIcon />
          </Input.IconAffix>
        }
        roundInput={roundInput}
      />
    );
  }
}

AddressInput.displayName = 'AddressInput';

AddressInput.propTypes = {
  /** Applied as data-hook HTML attribute that can be used in the tests */
  dataHook: PropTypes.string,

  /** A css class to be applied to the component's root element */
  className: PropTypes.string,

  /** Displays clear button (X) on a non-empty input */
  clearButton: PropTypes.bool,

  /** The initial input value */
  initialValue: PropTypes.string,

  /** Handler for address selection changes */
  onSelect: PropTypes.func,

  /** The debounce wait time for input changes. 0 to cancel debounce (useful when you already have a debounced api call) */
  debounceDuration: PropTypes.number,

  /** Debounced handler for input changes */
  onChange: PropTypes.func,

  /** The list of options to render. When the option is an {optionProps}, the <AddressInput.Option/> component will be rendered on behalf of the user. */
  options: PropTypes.array,

  /** Handler for getting notified upon a clear event, will show the clear button in the component input when passed. */
  onClear: PropTypes.func,

  /** Shows a status indication, will mostly be used for “loading” indication upon async request calls. */
  status: PropTypes.oneOf(['loading', 'error', 'warning']),

  /** The shape of the component input */
  roundInput: PropTypes.bool,

  /** Determines the option layout to display */
  optionsLayout: PropTypes.oneOf(['single-line', 'double-line']),

  /** Shows the default location icon <Icons.Location /> next to all options. Options with a `prefix` prop will show the provided node as an icon instead. False will hide the icons to all options. */
  showOptionsIcons: PropTypes.bool,

  /** Specifies the size of the input */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

AddressInput.defaultProps = {
  clearButton: true,
  debounceDuration: 200,
  roundInput: true,
  optionsLayout: 'single-line',
  showOptionsIcons: true,
};

export default AddressInput;
