import * as React from 'react';

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
}

export default class CounterBadge extends React.PureComponent<
  CounterBadgeProps
> {}
