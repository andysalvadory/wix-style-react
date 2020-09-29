import React from 'react';
import { storiesOf } from '@storybook/react';
import CounterBadge from '../CounterBadge';
import { Cell, Layout } from '../../Layout';
import HeartFilled from 'wix-ui-icons-common/HeartFilled';

const componentProps = {
  children: [undefined, 0, 33, 1000, 'Hello World', <HeartFilled />],
  skin: [
    'general',
    'standard',
    'neutralStandard',
    'danger',
    'warning',
    'urgent',
    'success',
  ],
};

let permutations = [];
Object.keys(componentProps).forEach(key => {
  if (permutations.length === 0) {
    componentProps[key].forEach(value => permutations.push({ [key]: value }));
  } else {
    const arr = [];
    componentProps[key].forEach(value =>
      permutations.forEach(group => arr.push({ ...group, [key]: value })),
    );
    permutations = arr;
  }
});

storiesOf('CounterBadge', module).add('default', () => (
  <Layout cols={6}>
    {permutations.map((props, key) => (
      <Cell key={key} span={1}>
        <CounterBadge {...props} />
      </Cell>
    ))}
  </Layout>
));
