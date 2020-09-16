import * as React from 'react';
import { SelectableAccordionItemProps as _SelectableAccordionItemProps } from './Item';

type SelectableAccordionItemProps = Pick<
  _SelectableAccordionItemProps,
  'type' | 'title' | 'subtitle' | 'content' | 'onChange'
> & { initiallyOpen: boolean };

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
