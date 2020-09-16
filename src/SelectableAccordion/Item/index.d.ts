import * as React from 'react';

export interface SelectableAccordionItemProps {
  title?: string;
  subtitle?: string;
  content?: React.ReactNode;
  type?: 'radio' | 'checkbox' | 'toggle';
  open?: boolean;
  onChange?(idx: number, open: boolean): void;
}

export default class SelectableAccordionItem extends React.Component<
  SelectableAccordionItemProps
> {}
