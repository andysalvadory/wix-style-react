import { baseUniDriverFactory, findByHook } from '../../test/utils/unidriver';
import { inputWithOptionsUniDriverFactory } from '../InputWithOptions/InputWithOptions.uni.driver';

export const addressInputDriverFactory = (base, body) => {
  const {
    driver,
    inputDriver,
    dropdownLayoutDriver,
  } = inputWithOptionsUniDriverFactory(base, body);

  return {
    ...baseUniDriverFactory(base, body),

    getInputValue: () => inputDriver.getValue(),
    enterText: text => inputDriver.enterText(text),
    clearText: () => inputDriver.clearText(),
    isDisabled: () => driver.isDisabled(),
    clickAtOption: position => dropdownLayoutDriver.clickAtOption(position),
    clickAtOptionWithValue: value =>
      dropdownLayoutDriver.clickAtOptionWithValue(value),
  };
};
