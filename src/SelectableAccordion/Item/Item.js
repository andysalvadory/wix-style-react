import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '../../Checkbox';
import ToggleSwitch from '../../ToggleSwitch';
import RadioGroup from '../../RadioGroup';
import Heading from '../../Heading';
import Text from '../../Text';
import Collapse from '../../Collapse';
import Divider from '../../Divider';

import { st, classes } from './Item.st.css';

export default class SelectableAccordionItem extends React.PureComponent {
  static propTypes = {
    /** A title of the item */
    title: PropTypes.string,

    /** An optional second row of the header */
    subtitle: PropTypes.string,

    /** A content of the item. Can be either string or React.Node */
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

    /** A type can be ether radio, checkbox, or toggle, which will effect the way an accordion item is selected */
    type: PropTypes.oneOf(['radio', 'checkbox', 'toggle']),

    /** A flag that indicates a open state */
    open: PropTypes.bool,

    /** An index of the item in the items list */
    idx: PropTypes.number,

    /** A callback which is ivoked every time the selection of the item is changed */
    onChange: PropTypes.func,
  };

  static defaultProps = {
    type: 'toggle',
    onChange: () => {},
  };

  static displayName = 'SelectableAccordionItem';

  _onChange = () => {
    const { idx, type, open, onChange } = this.props;

    if (type === 'radio' && open) {
      return;
    }

    onChange(idx, !open);
  };

  _renderSelector() {
    const { type, open } = this.props;

    if (type === 'checkbox') {
      return <Checkbox checked={open} onChange={this._onChange} />;
    } else if (type === 'toggle') {
      return (
        <ToggleSwitch checked={open} onChange={this._onChange} size="small" />
      );
    } else if (type === 'radio') {
      return <RadioGroup.Radio checked={open} onChange={this._onChange} />;
    }
  }

  _renderContent() {
    const { content } = this.props;

    if (typeof content === 'string') {
      return (
        <Text size="small" weight="thin">
          {content}
        </Text>
      );
    }

    return content;
  }

  render() {
    const { title, subtitle, open } = this.props;

    return (
      <div data-hook="selectable-accordion--item" className={st(classes.item)}>
        <div className={st(classes.selector)}>{this._renderSelector()}</div>
        <div onClick={this._onChange} className={st(classes.header)}>
          <Heading ellipsis appearance="H4">
            {title}
          </Heading>
          {subtitle && (
            <Text tagName="div" size="small" weight="thin">
              {subtitle}
            </Text>
          )}
        </div>
        <div className={st(classes.content)}>
          <Collapse open={open}>
            <div className={st(classes.inner)}>{this._renderContent()}</div>
          </Collapse>
          <Divider className={st(classes.divider)} />
        </div>
      </div>
    );
  }
}
