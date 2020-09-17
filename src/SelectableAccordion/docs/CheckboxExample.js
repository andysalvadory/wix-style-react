/* eslint-disable */
import React from 'react';
import SelectableAccordion from '../SelectableAccordion';

class CheckboxExample extends React.Component {
  render() {
    return (
      <SelectableAccordion
        type="checkbox"
        items={[
          {
            title: 'First row',
            content:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            initiallyOpen: true,
          },
          {
            title: 'Second row',
            subtitle: 'description',
            initiallyOpen: false,
            content: (
              <Text weight="bold">
                Lorem ipsum dolor sit amet,
                <br />
                consectetur adipiscing elit,
                <br />
                sed do eiusmod tempor incididunt ut labore
                <br />
                et dolore magna aliqua
              </Text>
            ),
          },
        ]}
      />
    );
  }
}
