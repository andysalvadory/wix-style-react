import PropTypes from 'prop-types';
import React from 'react';
import Loader from '../Loader/Loader';
import InfiniteScroll from '../utils/InfiniteScroll';
import scrollIntoView from '../utils/scrollIntoView';
import {
  DATA_HOOKS,
  DATA_OPTION,
  DATA_SHOWN,
  DATA_DIRECTION,
  DROPDOWN_LAYOUT_DIRECTIONS,
} from './DataAttr';
import { st, classes } from './DropdownLayout.st.css';
import deprecationLog from '../utils/deprecationLog';
import { filterObject } from '../utils/filterObject';
import ReactDOM from 'react-dom';

const MOUSE_EVENTS_SUPPORTED = ['mouseup', 'touchend'];

const modulu = (n, m) => {
  const remain = n % m;
  return remain >= 0 ? remain : remain + m;
};

const getUnit = value => {
  if (typeof value === 'string') {
    return value;
  }
  return `${value}px`;
};

const NOT_HOVERED_INDEX = -1;
export const DIVIDER_OPTION_VALUE = '-';

class DropdownLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hovered: NOT_HOVERED_INDEX,
      selectedId: props.selectedId,
    };

    if (props.hasOwnProperty('onClickOutside')) {
      deprecationLog(
        '<DropdownLayout/> - onClickOutside prop is deprecated and will be removed soon, please use dropdown base instead.',
      );
    }
  }

  _isControlled() {
    return (
      typeof this.props.selectedId !== 'undefined' &&
      typeof this.props.onSelect !== 'undefined'
    );
  }

  componentDidMount() {
    if (this.props.focusOnSelectedOption) {
      this._focusOnSelectedOption();
    }
    this._markOptionByProperty(this.props);

    // Deprecated
    MOUSE_EVENTS_SUPPORTED.forEach(eventName => {
      document.addEventListener(eventName, this._onMouseEventsHandler, true);
    });

    this._boundEvents = MOUSE_EVENTS_SUPPORTED;
  }

  // Deprecated
  checkIfEventOnElements(e, elem) {
    let current = e.target;
    while (current.parentNode) {
      if (elem.indexOf(current) > -1) {
        return true;
      }
      current = current.parentNode;
    }

    return current !== document;
  }

  // Deprecated
  _onMouseEventsHandler = e => {
    if (!this.checkIfEventOnElements(e, [ReactDOM.findDOMNode(this)])) {
      this.onClickOutside(e);
    }
  };

  _focusOnSelectedOption() {
    if (this.selectedOption) {
      this.options.scrollTop = Math.max(
        this.selectedOption.offsetTop - this.selectedOption.offsetHeight,
        0,
      );
    }
  }

  _setSelectedOptionNode(optionNode, option) {
    if (option.id === this.state.selectedId) {
      this.selectedOption = optionNode;
    }
  }

  onClickOutside = event => {
    const { visible, onClickOutside } = this.props;
    if (visible && onClickOutside) {
      onClickOutside(event);
    }
  };

  _markOption(index, options) {
    const { onOptionMarked } = this.props;
    options = options || this.props.options;

    this.setState({ hovered: index });
    onOptionMarked && onOptionMarked(options[index] || null);
  }

  _onSelect = (index, e) => {
    const { options, onSelect } = this.props;
    const chosenOption = options[index];

    if (chosenOption) {
      const sameOptionWasPicked = chosenOption.id === this.state.selectedId;
      if (onSelect) {
        e.stopPropagation();
        onSelect(chosenOption, sameOptionWasPicked);
      }
    }
    if (!this._isControlled()) {
      this.setState({ selectedId: chosenOption && chosenOption.id });
    }
    return !!onSelect && chosenOption;
  };

  _onMouseEnter = index => {
    if (this._isSelectableOption(this.props.options[index])) {
      this._markOption(index);
    }
  };

  _onMouseLeave = () => {
    this._markOption(NOT_HOVERED_INDEX);
  };

  _getMarkedIndex() {
    const { options } = this.props;
    const useHoverIndex = this.state.hovered > NOT_HOVERED_INDEX;
    const useSelectedIdIndex = typeof this.state.selectedId !== 'undefined';

    let markedIndex;
    if (useHoverIndex) {
      markedIndex = this.state.hovered;
    } else if (useSelectedIdIndex) {
      markedIndex = options.findIndex(
        option => option.id === this.state.selectedId,
      );
    } else {
      markedIndex = NOT_HOVERED_INDEX;
    }

    return markedIndex;
  }

  _markNextStep(step) {
    const { options } = this.props;

    if (!options.some(this._isSelectableOption)) {
      return;
    }

    let markedIndex = this._getMarkedIndex();

    do {
      markedIndex = Math.abs(
        modulu(Math.max(markedIndex + step, -1), options.length),
      );
    } while (!this._isSelectableOption(options[markedIndex]));
    this._markOption(markedIndex);
    const menuElement = this.options;
    const hoveredElement = this.props.infiniteScroll
      ? this.options.childNodes[0].childNodes[markedIndex]
      : this.options.childNodes[markedIndex];
    scrollIntoView(menuElement, hoveredElement);
  }

  /**
   * Handle keydown events for the DropdownLayout, mostly for accessibility
   *
   * @param {SyntheticEvent} event - The keydown event triggered by React
   * @returns {boolean} - Whether the event was handled by the component
   */
  _onKeyDown = event => {
    if (!this.props.visible || this.props.isComposing) {
      return false;
    }

    switch (event.key) {
      case 'ArrowDown': {
        this._markNextStep(1);
        event.preventDefault();
        break;
      }

      case 'ArrowUp': {
        this._markNextStep(-1);
        event.preventDefault();
        break;
      }

      case ' ':
      case 'Spacebar':
      case 'Enter': {
        if (!this._onSelect(this.state.hovered, event)) {
          return false;
        }
        break;
      }

      case 'Tab': {
        if (this.props.closeOnSelect) {
          return this._onSelect(this.state.hovered, event);
        } else {
          if (this._onSelect(this.state.hovered, event)) {
            event.preventDefault();
            return true;
          } else {
            return false;
          }
        }
        break;
      }

      case 'Escape': {
        this._onClose();
        break;
      }

      default: {
        return false;
      }
    }
    event.stopPropagation();
    return true;
  };

  _onClose = () => {
    this._markOption(NOT_HOVERED_INDEX);

    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  _renderNode(node) {
    return node ? <div>{node}</div> : null;
  }

  _wrapWithInfiniteScroll = scrollableElement => (
    <InfiniteScroll
      useWindow
      dataHook={DATA_HOOKS.INFINITE_SCROLL_CONTAINER}
      scrollElement={this.options}
      loadMore={this.props.loadMore}
      hasMore={this.props.hasMore}
      loader={
        <div className={classes.loader}>
          <Loader dataHook={'dropdownLayout-loader'} size={'small'} />
        </div>
      }
    >
      {scrollableElement}
    </InfiniteScroll>
  );

  /** for testing purposes only */
  _getDataAttributes = () => {
    const { visible, dropDirectionUp } = this.props;

    return filterObject(
      {
        'data-hook': DATA_HOOKS.CONTENT_CONTAINER,
        [DATA_SHOWN]: visible,
        [DATA_DIRECTION]: dropDirectionUp
          ? DROPDOWN_LAYOUT_DIRECTIONS.UP
          : DROPDOWN_LAYOUT_DIRECTIONS.DOWN,
      },
      (key, value) => !!value,
    );
  };

  render() {
    const {
      options,
      visible,
      dropDirectionUp,
      tabIndex,
      onMouseEnter,
      onMouseLeave,
      fixedHeader,
      withArrow,
      fixedFooter,
      inContainer,
      overflow,
      maxHeightPixels,
      minWidthPixels,
      infiniteScroll,
      dataHook,
    } = this.props;

    const renderedOptions = options.map((option, idx) =>
      this._renderOption({ option, idx }),
    );

    return (
      <div
        data-hook={dataHook}
        className={st(classes.root, {
          visible,
          withArrow,
          direction: dropDirectionUp
            ? DROPDOWN_LAYOUT_DIRECTIONS.UP
            : DROPDOWN_LAYOUT_DIRECTIONS.DOWN,
          containerStyles: !inContainer,
        })}
        tabIndex={tabIndex}
        onKeyDown={this._onKeyDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div
          {...this._getDataAttributes()}
          className={classes.contentContainer}
          style={{
            overflow,
            maxHeight: getUnit(maxHeightPixels),
            minWidth: getUnit(minWidthPixels),
          }}
        >
          {this._renderNode(fixedHeader)}
          <div
            className={classes.options}
            style={{
              maxHeight: getUnit(parseInt(maxHeightPixels, 10) - 35),
              overflow,
            }}
            ref={_options => (this.options = _options)}
            data-hook={DATA_HOOKS.DROPDOWN_LAYOUT_OPTIONS}
          >
            {infiniteScroll
              ? this._wrapWithInfiniteScroll(renderedOptions)
              : renderedOptions}
          </div>
          {this._renderNode(fixedFooter)}
        </div>
        {this._renderTopArrow()}
      </div>
    );
  }

  _renderOption({ option, idx }) {
    const { value, id, disabled, title, overrideStyle, linkTo } = option;
    if (value === DIVIDER_OPTION_VALUE) {
      return this._renderDivider(idx, `dropdown-divider-${id || idx}`);
    }

    const content = this._renderItem({
      option,
      idx,
      selected: id === this.state.selectedId,
      hovered: idx === this.state.hovered,
      disabled: disabled || title,
      title,
      overrideStyle,
      dataHook: `dropdown-item-${id}`,
    });

    return linkTo ? (
      <a
        className={classes.linkItem}
        key={idx}
        data-hook={DATA_HOOKS.LINK_ITEM}
        href={linkTo}
      >
        {content}
      </a>
    ) : (
      content
    );
  }

  _renderDivider(idx, dataHook) {
    return (
      <div
        key={idx}
        data-divider="true"
        className={classes.divider}
        data-hook={dataHook}
      />
    );
  }

  // For testing purposes only
  _getItemDataAttr = ({ hovered, selected, disabled, overrideStyle }) => {
    const { itemHeight, selectedHighlight } = this.props;

    return filterObject(
      {
        [DATA_OPTION.HOVERED]: hovered && !overrideStyle,
        [DATA_OPTION.SIZE]: itemHeight,
        [DATA_OPTION.DISABLED]: disabled,
        [DATA_OPTION.SELECTED]: selected && !overrideStyle && selectedHighlight,
        [DATA_OPTION.HOVERED_GLOBAL]: hovered && overrideStyle,
        [DATA_OPTION.SELECTED_GLOBAL]: selected && overrideStyle,
      },
      (key, value) => !!value,
    );
  };

  _renderItem({
    option,
    idx,
    selected,
    hovered,
    disabled,
    title,
    overrideStyle,
    dataHook,
  }) {
    const { itemHeight, selectedHighlight } = this.props;

    return (
      <div
        {...this._getItemDataAttr({
          hovered,
          selected,
          disabled,
          overrideStyle,
        })}
        className={st(classes.option, {
          selected: selected && selectedHighlight,
          hovered,
          disabled,
          title,
          itemHeight,
          overrideStyle,
        })}
        ref={node => this._setSelectedOptionNode(node, option)}
        onClick={!disabled ? e => this._onSelect(idx, e) : null}
        key={idx}
        onMouseEnter={() => this._onMouseEnter(idx)}
        onMouseLeave={this._onMouseLeave}
        data-hook={dataHook}
      >
        {typeof option.value === 'function'
          ? option.value({ selected, hovered, disabled })
          : option.value}
      </div>
    );
  }

  _renderTopArrow() {
    const { withArrow, visible } = this.props;

    if (this.props.hasOwnProperty('withArrow')) {
      deprecationLog(
        'DropdownLayout prop "withArrow" is deprecated and will be removed in the next major release, please use DropdownBase (with the prop "showArrow") or Popover component instead',
      );
    }

    return withArrow && visible ? (
      <div data-hook={DATA_HOOKS.TOP_ARROW} className={classes.arrow} />
    ) : null;
  }

  _markOptionByProperty(props) {
    if (this.state.hovered === NOT_HOVERED_INDEX && props.markedOption) {
      const selectableOptions = props.options.filter(this._isSelectableOption);
      if (selectableOptions.length) {
        const idToMark =
          props.markedOption === true
            ? selectableOptions[0].id
            : props.markedOption;
        this._markOption(
          this.findIndex(props.options, item => item.id === idToMark),
          props.options,
        );
      }
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.visible !== nextProps.visible) {
      this._markOption(NOT_HOVERED_INDEX);
    }

    if (this.props.selectedId !== nextProps.selectedId) {
      this.setState({ selectedId: nextProps.selectedId });
    }

    // make sure the same item is hovered if options changed
    if (
      this.state.hovered !== NOT_HOVERED_INDEX &&
      (!nextProps.options[this.state.hovered] ||
        this.props.options[this.state.hovered].id !==
          nextProps.options[this.state.hovered].id)
    ) {
      this._markOption(
        this.findIndex(
          nextProps.options,
          item => item.id === this.props.options[this.state.hovered].id,
        ),
      );
    }

    this._markOptionByProperty(nextProps);
  }

  findIndex(arr, predicate) {
    return (Array.isArray(arr) ? arr : []).findIndex(predicate);
  }

  _isSelectableOption(option) {
    return option && option.value !== '-' && !option.disabled && !option.title;
  }

  componentWillUnmount() {
    if (this._boundEvents && typeof document !== 'undefined') {
      this._boundEvents.forEach(eventName => {
        document.removeEventListener(
          eventName,
          this._onMouseEventsHandler,
          true,
        );
      });
    }
  }
}

const optionPropTypes = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  value: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.func])
    .isRequired,
  disabled: PropTypes.bool,
  overrideStyle: PropTypes.bool,
  /* the string displayed within the input when the option is selected */
  label: PropTypes.string,
});

export function optionValidator(props, propName, componentName) {
  const option = props[propName];

  // Notice: We don't use Proptypes.oneOf() to check for either option OR divider, because then the failure message would be less informative.
  if (typeof option === 'object' && option.value === DIVIDER_OPTION_VALUE) {
    return;
  }

  const optionError = PropTypes.checkPropTypes(
    { option: optionPropTypes },
    { option },
    'option',
    componentName,
  );

  if (optionError) {
    return optionError;
  }

  if (option.id && option.id.toString().trim().length === 0) {
    return new Error(
      'Warning: Failed option type: The option `option.id` should be non-empty after trimming in `DropdownLayout`.',
    );
  }

  if (option.value && option.value.toString().trim().length === 0) {
    return new Error(
      'Warning: Failed option type: The option `option.value` should be non-empty after trimming in `DropdownLayout`.',
    );
  }

  if (option.label && option.label.toString().trim().length === 0) {
    return new Error(
      'Warning: Failed option type: The option `option.label` should be non-empty after trimming in `DropdownLayout`.',
    );
  }
}

DropdownLayout.propTypes = {
  dropDirectionUp: PropTypes.bool,
  /** Scroll to the selected option on opening the dropdown */
  focusOnSelectedOption: PropTypes.bool,
  onClose: PropTypes.func,
  /** Callback function called whenever the user selects a different option in the list */
  onSelect: PropTypes.func,
  /** Callback function called whenever an option becomes focused (hovered/active). Receives the relevant option object from the original props.options array. */
  onOptionMarked: PropTypes.func,
  /** Set overflow of container */
  overflow: PropTypes.string,
  visible: PropTypes.bool,
  /** Array of objects. Objects must have an Id and can can include value and node. If value is '-', a divider will be rendered instead (dividers do not require and id). */
  options: PropTypes.arrayOf(optionValidator),
  /** The id of the selected option in the list  */
  selectedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tabIndex: PropTypes.number,
  onClickOutside: PropTypes.func,
  /** A fixed header to the list */
  fixedHeader: PropTypes.node,
  /** A fixed footer to the list */
  fixedFooter: PropTypes.node,
  maxHeightPixels: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minWidthPixels: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  withArrow: PropTypes.bool,
  closeOnSelect: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  itemHeight: PropTypes.oneOf(['small', 'big']),
  selectedHighlight: PropTypes.bool,
  inContainer: PropTypes.bool,
  infiniteScroll: PropTypes.bool,
  loadMore: PropTypes.func,
  hasMore: PropTypes.bool,
  /** Sets the default hover behavior when:
   *  1. `false` means no default
   *  2. `true` means to hover the first selectable option
   *  3. Any number/string represents the id of option to hover
   */
  markedOption: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number,
  ]),
};

DropdownLayout.defaultProps = {
  options: [],
  tabIndex: 0,
  maxHeightPixels: 260,
  closeOnSelect: true,
  itemHeight: 'small',
  selectedHighlight: true,
  inContainer: false,
  infiniteScroll: false,
  loadMore: null,
  hasMore: false,
  markedOption: false,
  overflow: 'auto',
};

DropdownLayout.NONE_SELECTED_ID = NOT_HOVERED_INDEX;

export default DropdownLayout;
