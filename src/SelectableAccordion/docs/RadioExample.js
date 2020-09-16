/* eslint-disable */
import React from 'react';
import SelectableAccordion from '../SelectableAccordion';

class RadioExample extends React.Component {
  render() {
    return (
      <SelectableAccordion
        type="radio"
        items={[
          {
            title: 'First row',
            content:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            initiallyOpen: true,
          },
          {
            title:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            subtitle: <span>I'm subtitle</span>,
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
