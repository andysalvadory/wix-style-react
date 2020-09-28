import React from 'react';
import { createRendererWithUniDriver, cleanup } from '../../../test/utils/unit';

import AddressInput from '../AddressInput';
import { addressInputPrivateDriverFactory } from './AddressInput.private.uni.driver';

describe(AddressInput.displayName, () => {
  const render = createRendererWithUniDriver(addressInputPrivateDriverFactory);

  afterEach(cleanup);

  it('should render', async () => {
    const { driver } = render(<AddressInput />);

    expect(await driver.exists()).toBe(true);
  });

  it('should increment', async () => {
    const { driver } = render(<AddressInput />);

    await driver.clickButtonTimes(2);

    expect(await driver.getCountText()).toEqual(
      'You clicked this button even number (2) of times',
    );
  });

  it('should allow changing the button text', async () => {
    const { driver } = render(<AddressInput buttonText="Press me" />);

    expect(await driver.getButtonText()).toEqual('Press me');
  });
});
