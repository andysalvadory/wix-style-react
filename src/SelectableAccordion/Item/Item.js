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
    title: PropTypes.node,

    /** An optional second row of the header */
    subtitle: PropTypes.node,

    /** A content of the item */
    content: PropTypes.node,

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

  state = {
    hovered: false,
  };

  _onChange = () => {
    const { idx, type, open, onChange } = this.props;

    if (type === 'radio' && open) {
      return;
    }

    onChange(idx, !open);
  };

  _onMouseEnter = () => {
    this.setState({
      hovered: true,
    });
  };

  _onMouseLeave = () => {
    this.setState({
      hovered: false,
    });
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

    if (!content) {
      return null;
    }

    if (typeof content === 'string') {
      return (
        <Text className={st(classes.text)} size="small" weight="thin">
          {content}
        </Text>
      );
    }

    return content;
  }

  _renderTitle() {
    const { title } = this.props;

    if (!title) {
      return null;
    }

    if (typeof title === 'string') {
      return (
        <Heading ellipsis appearance="H4">
          {title}
        </Heading>
      );
    }

    return title;
  }

  _renderSubtitle() {
    const { subtitle } = this.props;

    if (!subtitle) {
      return null;
    }

    if (typeof subtitle === 'string') {
      return (
        <div>
          <Text ellipsis size="small" weight="thin">
            {subtitle}
          </Text>
        </div>
      );
    }

    return subtitle;
  }

  render() {
    const { hovered } = this.state;
    const { open } = this.props;

    return (
      <div
        data-hook="selectable-accordion--item"
        data-state={open ? 'open' : 'collapsed'}
        className={st(classes.item, { hovered })}
      >
        <div
          onMouseEnter={this._onMouseEnter}
          onMouseLeave={this._onMouseLeave}
          onClick={this._onChange}
          className={st(classes.selector)}
        >
          {this._renderSelector()}
        </div>
        <div
          data-hook="selectable-accordion--item--header"
          onMouseEnter={this._onMouseEnter}
          onMouseLeave={this._onMouseLeave}
          onClick={this._onChange}
          className={st(classes.header)}
        >
          {this._renderTitle()}
          {this._renderSubtitle()}
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
