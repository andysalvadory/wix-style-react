import * as React from 'react';
import { SelectableAccordionItemCommonProps } from './Item';

type SelectableAccordionItemProps = SelectableAccordionItemCommonProps & {
  initiallyOpen?: boolean;
};

export interface SelectableAccordionProps {
  dataHook?: string;
  className?: string;
  type?: 'radio' | 'checkbox' | 'toggle';
  items?: SelectableAccordionItemProps[];
  onSelectionChanged?(selectedIds: number[]): void;
}

export default class SelectableAccordion extends React.PureComponent<
  SelectableAccordionProps
> {}
