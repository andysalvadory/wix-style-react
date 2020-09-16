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

import SparklineChart from '..';

const example = config => baseExample({ components: allComponents, ...config });
const code = config => baseCode({ components: allComponents, ...config });

const data = {
  name: 'visits',
  pairs: [
    { label: new Date('Thu Sep 4 2020'), value: 3 },
    { label: new Date('Thu Sep 5 2020'), value: 17 },
    { label: new Date('Thu Sep 6 2020'), value: 18 },
    { label: new Date('Thu Sep 7 2020'), value: 12 },
    { label: new Date('Thu Sep 8 2020'), value: 8 },
    { label: new Date('Thu Sep 9 2020'), value: 7 },
    { label: new Date('Thu Sep 10 2020'), value: 9 },
  ],
  color: '#FF0000',
};

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: SparklineChart,
  componentPath: '..',

  componentProps: {
    data: data,
    getTooltipContent: index => data.pairs[index].label.toLocaleDateString(),
    highlightedStartingIndex: 4,
    width: 400,
    height: 80,
  },

  exampleProps: {
    // Put here presets of props, for more info:
    // https://github.com/wix/wix-ui/blob/master/packages/wix-storybook-utils/docs/usage.md#using-list
  },

  sections: [
    header({
      sourceUrl: `https://github.com/wix/wix-style-react/tree/master/src/${SparklineChart.displayName}/`,
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          description({
            title: 'Description',
            text: 'Simple sparkline chart component.',
          }),

          importExample(),

          divider(),

          title('Examples'),

          example({
            title: 'Simple Usage',
            text: 'A simple example with compact preview',
            source: ` <SparklineChart
                getTooltipContent={index => index}
                data={{
                  name: 'visits',
                  pairs: [
                    { label: new Date('Thu Sep 4 2020'), value: 3 },
                    { label: new Date('Thu Sep 5 2020'), value: 17 },
                    { label: new Date('Thu Sep 6 2020'), value: 18 },
                    { label: new Date('Thu Sep 7 2020'), value: 12 },
                    { label: new Date('Thu Sep 8 2020'), value: 8 },
                    { label: new Date('Thu Sep 9 2020'), value: 7 },
                    { label: new Date('Thu Sep 10 2020'), value: 9 },
                                  ],
                }}

          />`,
          }),

          code({
            title: 'Full Interactive Preview',
            description: 'A non compact version of same code example as above',
            source: `<SparklineChart
            getTooltipContent={index => index}
            data={{
              name: 'visits',
              pairs: [
                { label: new Date('Thu Sep 4 2020'), value: 3 },
                { label: new Date('Thu Sep 5 2020'), value: 17 },
                { label: new Date('Thu Sep 6 2020'), value: 18 },
                { label: new Date('Thu Sep 7 2020'), value: 12 },
                { label: new Date('Thu Sep 8 2020'), value: 8 },
                { label: new Date('Thu Sep 9 2020'), value: 7 },
                { label: new Date('Thu Sep 10 2020'), value: 9 },
                              ],
              color: '#FF0000',
            }}
            highlightedStartingIndex={4}
            width={400}
            height={80}/>`,
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
