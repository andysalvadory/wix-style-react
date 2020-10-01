import DatePicker from '..';
import { format } from 'date-fns';
import { storySettings } from './storySettings';
import {
  header,
  tabs,
  tab,
  api,
  testkit,
  playground,
  importExample,
  divider,
  title,
  description,
  code as baseCode,
  example as baseExample,
} from 'wix-storybook-utils/dist/src/Sections';
import * as examples from './examples';
import allComponents from '../../../stories/utils/allComponents';
import { columns } from 'wix-storybook-utils/Sections';
import { commonPopoverPropsExample } from '../../../stories/utils/playgroundUtils';
import { convertTokens } from '@date-fns/upgrade/v2';

const example = config => baseExample({ components: allComponents, ...config });

const defaultValue = new Date('2017/05/01');
const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

const code = config =>
  baseCode({
    components: allComponents,
    ...config,
  });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: DatePicker,
  componentPath: '..',

  componentProps: setState => ({
    onChange: value => setState({ value }),
    dateFormatV2: 'yyyy/LL/dd',
    placeholderText: 'Select Date',
    value: defaultValue,
    shouldCloseOnSelect: true,
    showYearDropdown: false,
    showMonthDropdown: false,
    locale: 'en',
    twoMonths: false,
  }),

  exampleProps: {
    onChange: date => format(date, convertTokens('YYYY/MM/DD')),
    value: [
      { label: '2017/05/01', value: defaultValue },
      { label: 'Today', value: today },
      { label: 'Tomorrow', value: tomorrow },
    ],
    dateFormatV2: [
      { label: 'yyyy/LL/dd', value: 'yyyy/LL/dd' },
      { label: 'LL/dd/yyyy', value: 'LL/dd/yyyy' },
      {
        label: 'custom function (date.getDate())',
        value: date => date.getDate(),
      },
    ],
    popoverProps: commonPopoverPropsExample,
    firstDayOfWeek: [
      {
        label: `0`,
        value: 0,
      },
      {
        label: `1`,
        value: 1,
      },
      {
        label: `2`,
        value: 2,
      },
      {
        label: `3`,
        value: 3,
      },
      {
        label: `4`,
        value: 4,
      },
      {
        label: `5`,
        value: 5,
      },
      {
        label: `6`,
        value: 6,
      },
    ],
  },

  sections: [
    header({
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/DatePicker',
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          importExample("import { DatePicker } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          example({
            title: 'Simple generic use',
            source: examples.simple,
          }),

          example({
            title: 'DatePicker customizations',
            source: examples.customizations,
          }),

          example({
            title: 'Using filterDate',
            text:
              'The function filterDate gets a date and returns true if this date valid to select, in this example only prior dates to today can be selected.',
            source: examples.filterDate,
          }),

          example({
            title: 'With Status',
            text: `Setting a status to indicate some there's an issue.`,
            source: examples.status,
          }),

          // TODO - disabled until https://github.com/wix/wix-style-react/issues/4157 is fixed
          // code({
          //   title: 'Range Selection',
          //   source: examples.rangeSelection,
          // }),
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
