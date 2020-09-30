import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '../../Checkbox';
import ToggleSwitch from '../../ToggleSwitch';
import RadioGroup from '../../RadioGroup';
import Heading from '../../Heading';
import Text from '../../Text';
import Collapse from '../../Collapse';
import Divider from '../../Divider';
import { dataHooks, TYPES } from '../constants';
import { isString } from '../../utils/StringUtils';

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

    /** A callback which is invoked every time the selection of the item is changed */
    onChange: PropTypes.func,
  };

  static defaultProps = {
    type: 'toggle',
    onChange: () => {},
  };

  static displayName = 'SelectableAccordionItem';

  state = { hovered: false };

  _onChange = () => {
    const { idx, type, open, onChange } = this.props;

    if (type === 'radio' && open) {
      return;
    }

    onChange(idx, !open);
  };

  _onMouseEnter = () => this.setState({ hovered: true });

  _onMouseLeave = () => this.setState({ hovered: false });

  _renderSelector() {
    const { type, open } = this.props;
    let selector = null;

    switch (type) {
      case TYPES.CHECKBOX:
        selector = <Checkbox checked={open} onChange={this._onChange} />;
        break;
      case TYPES.RADIO:
        selector = (
          <RadioGroup.Radio checked={open} onChange={this._onChange} />
        );
        break;
      case TYPES.TOGGLE:
        selector = (
          <ToggleSwitch checked={open} onChange={this._onChange} size="small" />
        );
        break;
    }

    return selector;
  }

  _renderTitle() {
    const { title } = this.props;
    return isString(title) ? (
      <Heading ellipsis appearance="H4">
        {title}
      </Heading>
    ) : (
      title
    );
  }

  _renderContent() {
    const { content } = this.props;

    return isString(content) ? (
      <Text className={classes.text} size="small" weight="thin">
        {content}
      </Text>
    ) : (
      content
    );
  }

  _renderSubtitle() {
    const { subtitle } = this.props;

    return isString(subtitle) ? (
      <Text ellipsis size="small" weight="thin">
        {subtitle}
      </Text>
    ) : (
      subtitle
    );
  }

  render() {
    const { hovered } = this.state;
    const { open } = this.props;

    return (
      <div
        data-hook={dataHooks.item}
        data-state={open ? 'open' : 'collapsed'}
        className={st(classes.item, { hovered })}
      >
        <div
          onMouseEnter={this._onMouseEnter}
          onMouseLeave={this._onMouseLeave}
          onClick={this._onChange}
          className={classes.selector}
        >
          {this._renderSelector()}
        </div>
        <div
          data-hook={dataHooks.itemHeader}
          onMouseEnter={this._onMouseEnter}
          onMouseLeave={this._onMouseLeave}
          onClick={this._onChange}
          className={classes.header}
        >
          {this._renderTitle()}
          {this._renderSubtitle()}
        </div>
        <div className={classes.content}>
          <Collapse open={open}>
            <div className={classes.inner}>{this._renderContent()}</div>
          </Collapse>
          <Divider className={classes.divider} />
        </div>
      </div>
    );
  }
}
