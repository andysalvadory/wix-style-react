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

    /**
     * Returns value of the input
     * @returns {Promise<string>}
     */
    getInputValue: () => inputDriver.getValue(),

    /**
     * Enters given text to input
     * @param {string} text Text to input
     * @returns {Promise<void>}
     */
    enterText: text => inputDriver.enterText(text),

    /**
     * Clears the input
     * @returns {Promise<void>}
     */
    clearText: () => inputDriver.clearText(),

    /**
     * Checks if input is disabled
     * @returns {Promise<boolean>}
     */
    isDisabled: () => driver.isDisabled(),

    /**
     * Clicks an option at given position
     * @param {number} position Position of the option
     * @returns {Promise<void>}
     */
    clickAtOption: position => dropdownLayoutDriver.clickAtOption(position),

    /**
     * Clicks an option with a given value
     * @param {string} value The option value
     * @returns {Promise<void>}
     */
    clickAtOptionWithValue: value =>
      dropdownLayoutDriver.clickAtOptionWithValue(value),
  };
};
