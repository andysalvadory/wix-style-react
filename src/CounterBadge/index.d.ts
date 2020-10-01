import * as React from 'react';

export type CounterBadgeSize = 'medium' | 'small';

export type CounterBadgeSkin =
  | 'general'
  | 'standard'
  | 'danger'
  | 'warning'
  | 'urgent'
  | 'success'
  | 'neutralStandard';

export interface CounterBadgeProps {
  dataHook?: string;
  className?: string;
  skin?: CounterBadgeSkin;
  size?: CounterBadgeSize;
}

export default class CounterBadge extends React.PureComponent<
  CounterBadgeProps
> {}
