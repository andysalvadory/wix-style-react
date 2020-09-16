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
  code as baseCode,
  playground,
  api,
  testkit,
} from 'wix-storybook-utils/Sections';

import { storySettings } from '../test/storySettings';
import allComponents from '../../../stories/utils/allComponents';

import SelectableAccordion from '..';
import SelectableAccordionRadioExample from '!raw-loader!./RadioExample';
import SelectableAccordionToggleExample from '!raw-loader!./ToggleExample';
import SelectableAccordionCheckboxExample from '!raw-loader!./CheckboxExample';

const example = config => baseExample({ components: allComponents, ...config });
const code = config => baseCode({ components: allComponents, ...config });

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
              'This line here should briefly describe component in just a sentence or two. It should be short and easy to read.',
          }),

          importExample(),

          divider(),

          title('Examples'),

          example({
            title: 'Radio type',
            source: SelectableAccordionRadioExample,
          }),

          example({
            title: 'Toggle type',
            source: SelectableAccordionToggleExample,
          }),

          example({
            title: 'Checkbox type',
            source: SelectableAccordionCheckboxExample,
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
