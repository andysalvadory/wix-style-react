import React from 'react';
import {
  createRendererWithUniDriver,
  cleanup,
  eventually,
} from '../../../test/utils/unit';

import SelectableAccordion from '../SelectableAccordion';
import { selectableAccordionPrivateDriverFactory } from './SelectableAccordion.private.uni.driver';
import { TYPE } from '../constants';

describe(SelectableAccordion.displayName, () => {
  const render = createRendererWithUniDriver(
    selectableAccordionPrivateDriverFactory,
  );

  const items = [
    { title: 'Title1', content: 'Content1' },
    { title: 'Title2', content: 'Content2' },
    { title: 'Title3', content: 'Content3' },
  ];

  afterEach(cleanup);

  it('should render', async () => {
    const { driver } = render(<SelectableAccordion />);

    expect(await driver.exists()).toBe(true);
  });

  it('should render all items', async () => {
    const { driver } = render(<SelectableAccordion items={items} />);

    expect(await driver.getItemsCount()).toBe(3);
  });

  it('should dynamically rerender items', async () => {
    const { driver, rerender } = render(<SelectableAccordion items={items} />);

    expect(await driver.getItemsCount()).toBe(3);

    rerender(
      <SelectableAccordion
        items={[
          { title: 'Title1', content: 'Content1' },
          { title: 'Title2', content: 'Content2' },
        ]}
      />,
    );

    expect(await driver.getItemsCount()).toBe(2);
  });

  it('should initially open relevant items', async () => {
    const { driver } = render(
      <SelectableAccordion
        items={[
          { title: 'Title1', content: 'Content1' },
          { title: 'Title2', content: 'Content2', initiallyOpen: true },
          { title: 'Title3', content: 'Content3' },
        ]}
      />,
    );

    await eventually(async () => {
      expect(await driver.isItemExpandedAt(0)).toBe(false);
      expect(await driver.isItemExpandedAt(1)).toBe(true);
      expect(await driver.isItemExpandedAt(2)).toBe(false);
    });
  });

  describe('Type Radio', () => {
    const props = {
      type: TYPE.RADIO,
      items,
    };

    it('should open item', async () => {
      const { driver } = render(<SelectableAccordion {...props} />);

      await driver.clickItemAt(0);
      expect(await driver.isItemExpandedAt(0)).toBe(true);
    });

    it('should not close open item', async () => {
      const { driver } = render(<SelectableAccordion {...props} />);

      await driver.clickItemAt(0);
      expect(await driver.isItemExpandedAt(0)).toBe(true);
      await driver.clickItemAt(0);
      expect(await driver.isItemExpandedAt(0)).toBe(true);
    });

    it('should close previously open item', async () => {
      const { driver } = render(<SelectableAccordion {...props} />);

      await driver.clickItemAt(0);
      expect(await driver.isItemExpandedAt(0)).toBe(true);
      await driver.clickItemAt(1);
      expect(await driver.isItemExpandedAt(0)).toBe(false);
    });
  });

  [TYPE.TOGGLE, TYPE.CHECKBOX].forEach(type => {
    describe(`Type ${type}`, () => {
      const props = { items, type };

      it('should open item', async () => {
        const { driver } = render(<SelectableAccordion {...props} />);

        await driver.clickItemAt(0);
        expect(await driver.isItemExpandedAt(0)).toBe(true);
      });

      it('should close item', async () => {
        const { driver } = render(<SelectableAccordion {...props} />);

        await driver.clickItemAt(0);
        expect(await driver.isItemExpandedAt(0)).toBe(true);
        await driver.clickItemAt(0);
        expect(await driver.isItemExpandedAt(0)).toBe(false);
      });

      it('should open multiple items', async () => {
        const { driver } = render(<SelectableAccordion {...props} />);

        await driver.clickItemAt(0);
        expect(await driver.isItemExpandedAt(0)).toBe(true);
        await driver.clickItemAt(1);
        expect(await driver.isItemExpandedAt(0)).toBe(true);
        expect(await driver.isItemExpandedAt(1)).toBe(true);
      });
    });
  });
});
