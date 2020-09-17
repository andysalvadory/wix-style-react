import React from 'react';
import { createRendererWithUniDriver, cleanup } from '../../../test/utils/unit';

import SparklineChart from '../SparklineChart';
import { sparklineChartPrivateDriverFactory } from './SparklineChart.private.uni.driver';

describe(SparklineChart.displayName, () => {
  const render = createRendererWithUniDriver(
    sparklineChartPrivateDriverFactory,
  );

  afterEach(cleanup);

  it('should render', async () => {
    const { driver } = render(<SparklineChart />);

    expect(await driver.exists()).toBe(true);
  });
});
