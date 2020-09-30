import { BaseUniDriver } from 'wix-ui-test-utils/unidriver';

export interface AddressInputUniDriver extends BaseUniDriver {
  getInputValue: () => Promise<string>;
  enterText: (value: string) => Promise<void>;
  clearText: () => Promise<void>;
  isDisabled: () => Promise<boolean>;
  clickAtOption: (index: number) => Promise<void>;
  clickAtOptionWithValue: (value: string) => Promise<void>;
}
