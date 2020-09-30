import { BaseUniDriver } from 'wix-ui-test-utils/unidriver';

export interface SelectableAccordionUniDriver extends BaseUniDriver {
  getCountText(): Promise<string>;
  getButtonText(): Promise<string>;
}
