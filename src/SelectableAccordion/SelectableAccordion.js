import React from 'react';
import PropTypes from 'prop-types';

import SelectableAccordionItem from './Item';

import { st, classes } from './SelectableAccordion.st.css';

/** SelectableAccordion */
class SelectableAccordion extends React.PureComponent {
  static propTypes = {
    /** Applied as data-hook HTML attribute that can be used in the tests */
    dataHook: PropTypes.string,

    /** A css class to be applied to the component's root element */
    className: PropTypes.string,

    /** A type can be ether radio, checkbox, or toggle, which will effect the way an accordion item is selected */
    type: PropTypes.oneOf(['radio', 'checkbox', 'toggle']),

    /** An array of Accordion items */
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.node,
        subtitle: PropTypes.node,
        content: PropTypes.node,
        initiallyOpen: PropTypes.bool,
      }),
    ),

    /** A callback which is invoked every time the selection is changed */
    onSelectionChanged: PropTypes.func,
  };

  static defaultProps = {
    type: 'toggle',
    items: [],
  };

  static displayName = 'SelectableAccordion';

  state = {
    openIndices: this._populateInitiallyOpenIndices(),
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        openIndices: this._populateInitiallyOpenIndices(),
      });
    }
  }

  _populateInitiallyOpenIndices() {
    const { items } = this.props;
    const openIndices = {};

    for (let i = 0; i < items.length; i++) {
      openIndices[i] = Boolean(items[i].initiallyOpen);
    }

    return openIndices;
  }

  _isOpen(idx) {
    return this.state.openIndices[idx];
  }

  _onItemChanged = (idx, open) => {
    const { type, items, onSelectionChanged } = this.props;

    let openIndices = {};

    if (type === 'radio') {
      for (let i = 0; i < items.length; i++) {
        openIndices[i] = i === idx;
      }
    } else {
      openIndices = {
        ...this.state.openIndices,
        [idx]: open,
      };
    }

    this.setState(
      { openIndices },
      () => onSelectionChanged && onSelectionChanged(openIndices),
    );
  };

  render() {
    const { dataHook, className, items, type } = this.props;

    return (
      <div className={st(classes.root, className)} data-hook={dataHook}>
        {items.map((item, idx) => (
          <SelectableAccordionItem
            key={idx}
            idx={idx}
            type={type}
            onChange={this._onItemChanged}
            {...item}
            open={this._isOpen(idx)}
          />
        ))}
      </div>
    );
  }
}

export default SelectableAccordion;
