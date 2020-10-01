import React from 'react';
import Sinon from 'sinon';
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

  it('should insert initial value', async () => {
    const initialValue = 'test';
    const props = {
      initialValue,
    };
    const { driver } = render(<AddressInput {...props} />);

    expect(await driver.getInputValue()).toEqual(initialValue);
  });

  it('should invoke onChange', async () => {
    const text = 'test';
    const props = {
      onChange: Sinon.spy(),
    };
    const { driver } = render(<AddressInput {...props} />);

    expect(props.onChange.called).toEqual(false);
    expect(await driver.getInputValue()).toEqual('');

    await driver.enterText(text);

    expect(props.onChange.called).toEqual(true);
    expect(await driver.getInputValue()).toEqual(text);
  });

  it('should invoke onSelect', async () => {
    const option = { id: 0, value: 'First' };
    const props = {
      onSelect: Sinon.spy(),
      options: [option],
    };
    const { driver } = render(<AddressInput {...props} />);

    await driver.clickAtOption(0);

    expect(props.onSelect.calledWith(option)).toEqual(true);
  });
});
