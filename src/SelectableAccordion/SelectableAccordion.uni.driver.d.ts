import { BaseUniDriver } from 'wix-ui-test-utils/unidriver';

export interface SelectableAccordionUniDriver extends BaseUniDriver {
  clickItemAt(): Promise<void>;
  isItemExpandedAt(): Promise<boolean>;
}
