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

    getInputValue: inputDriver.getValue,
    enterText: inputDriver.enterText,
    clearText: inputDriver.clearText,
    isDisabled: driver.isDisabled,
    clickAtOption: dropdownLayoutDriver.clickAtOption,
    clickAtOptionWithValue: dropdownLayoutDriver.clickAtOptionWithValue,
  };
};
