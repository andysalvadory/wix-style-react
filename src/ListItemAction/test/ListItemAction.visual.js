import React from 'react';
import ListItemAction from '..';
import Edit from 'wix-ui-icons-common/Edit';
import { storyOfAllPermutations } from '../../../test/utils/visual/utils';

const Story = props => (
  <div
    style={{
      padding: '6px',
      width: '600px',
      background: '#eee',
      display: 'grid',
      gridAutoFlow: 'column',
      gridGap: '6px',
    }}
  >
    {['standard', 'dark', 'destructive'].map(skin => (
      <div key={skin}>
        <ListItemAction {...props} skin={skin} title="Hello!" />
      </div>
    ))}
  </div>
);

const options = {
  props: [
    'size',
    'disabled',
    'highlighted',
    {
      name: 'prefixIcon',
      values: [undefined, <Edit />],
    },
  ],
  skipUndefinedValue: true,
  storyName: 'sanity',
};

storyOfAllPermutations(Story, ListItemAction, options);

const EllipsisStory = props => (
  <div style={{ width: '250px' }}>
    <ListItemAction
      {...props}
      title="This is a very long title that will not fit a single line"
    />
  </div>
);

const ellipsisOptions = {
  props: [
    'size',
    {
      name: 'prefixIcon',
      values: [undefined, <Edit />],
    },
    'ellipsis',
    {
      name: 'subtitle',
      values: [
        undefined,
        'This is a very long subtitle that will not fit a single line',
      ],
    },
  ],
  skipUndefinedValue: true,
  storyName: 'ellipsis',
};

storyOfAllPermutations(EllipsisStory, ListItemAction, ellipsisOptions);
