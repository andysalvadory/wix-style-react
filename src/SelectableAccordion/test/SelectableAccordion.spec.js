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
});
