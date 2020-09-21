import * as React from 'react';
import SparklineChart from '..';
import { sparklineChartTestkitFactory } from '../../../testkit';
import { sparklineChartTestkitFactory as sparklineChartEnzymeTestkitFactory } from '../../../testkit/enzyme';
import { sparklineChartTestkitFactory as sparklineChartPuppeteerTestkitFactory } from '../../../testkit/puppeteer';
import * as enzyme from 'enzyme';
import * as puppeteer from 'puppeteer';

// function sparklineChartWithMandatoryProps() {
//   return <SparklineChart />;
// }

// function sparklineChartWithAllProps() {
//   return (
//     <SparklineChart
//       dataHook="dataHook"
//       className="className"
//     />
//   );
// }

async function testkits() {
  const testkit = sparklineChartTestkitFactory({
    dataHook: 'hook',
    wrapper: document.createElement('div'),
  });

  const enzymeTestkit = sparklineChartEnzymeTestkitFactory({
    dataHook: 'hook',
    wrapper: enzyme.mount(<div />),
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const puppeteerTestkit = await sparklineChartPuppeteerTestkitFactory({
    dataHook: 'hook',
    page,
  });
}
