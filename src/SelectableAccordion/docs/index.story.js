import React from 'react';
import {
  header,
  tabs,
  tab,
  description,
  importExample,
  title,
  divider,
  example as baseExample,
  playground,
  api,
  testkit,
} from 'wix-storybook-utils/Sections';

import { storySettings } from '../test/storySettings';
import allComponents from '../../../stories/utils/allComponents';

import SelectableAccordion from '..';
import * as examples from './examples';

const example = config => baseExample({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: SelectableAccordion,
  componentPath: '..',

  componentProps: {},

  sections: [
    header({
      sourceUrl: `https://github.com/wix/wix-style-react/tree/master/src/${SelectableAccordion.displayName}/`,
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          description({
            title: 'Description',
            text:
              'Selectable Accordion is a list of collapsible content that shows up when the controller is clicked. It supports three types of controllers — radio, checkbox, toggle. Use it to list selectable features which have more controls when they are enabled.',
          }),

          importExample(),

          divider(),

          title('Examples'),

          example({
            title: 'Structure',
            text:
              '`<SelectableAccordion/>` consists of list items with the clickable header, and content area.',
            source: examples.structure,
          }),

          example({
            title: 'Type',
            text:
              '`<SelectableAccordion/>` supports three types of controllers— `radio`, `checkbox` and `toggle` (default). ' +
              '- Use a radio when a user has to select one option. ' +
              '- Use a checkbox when a user has to include options from the list. ' +
              '- Use a toggle when a user has to enable features.',
            source: examples.typesExample,
          }),

          example({
            title: 'Subtitle',
            text:
              '`<SelectableAccordion/>` item header can have a subtitle. Use it to explain the options.',
            source: examples.subtitle,
          }),

          example({
            title: 'Initially Active / Open',
            text:
              '`<SelectableAccordion/>` items can load open by setting `initiallyOpen` to `true`.',
            source: examples.initiallyOpen,
          }),

          example({
            title: 'Advanced Example',
            text:
              'This example shows how it can be applied to a real case scenario while using it with other components.',
            source: examples.advancedExample,
          }),
        ],
      }),

      ...[
        { title: 'API', sections: [api()] },
        { title: 'Testkit', sections: [testkit()] },
        { title: 'Playground', sections: [playground()] },
      ].map(tab),
    ]),
  ],
};
