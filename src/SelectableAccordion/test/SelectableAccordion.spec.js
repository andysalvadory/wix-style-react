import React from 'react';
import { createRendererWithUniDriver, cleanup } from '../../../test/utils/unit';

import SelectableAccordion from '../SelectableAccordion';
import { selectableAccordionPrivateDriverFactory } from './SelectableAccordion.private.uni.driver';

describe(SelectableAccordion.displayName, () => {
  const render = createRendererWithUniDriver(
    selectableAccordionPrivateDriverFactory,
  );

  afterEach(cleanup);

  it('should render', async () => {
    const { driver } = render(<SelectableAccordion />);

    expect(await driver.exists()).toBe(true);
  });

  it('should increment', async () => {
    const { driver } = render(<SelectableAccordion />);

    await driver.clickButtonTimes(2);

    expect(await driver.getCountText()).toEqual(
      'You clicked this button even number (2) of times',
    );
  });

  it('should allow changing the button text', async () => {
    const { driver } = render(<SelectableAccordion buttonText="Press me" />);

    expect(await driver.getButtonText()).toEqual('Press me');
  });
});
