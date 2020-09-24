import { browser, $ } from 'protractor';
import eventually from 'wix-eventually';
import { createTestStoryUrl } from '../../../../test/utils/storybook-helpers';
import { Category } from '../../../../stories/storiesHierarchy';

describe('Ellipsis', () => {
  const navigateToTestUrl = async testName => {
    const testStoryUrl = createTestStoryUrl({
      category: Category.INTERNAL,
      storyName: 'Ellipsis',
      testName,
      withExamples: false,
    });
    await browser.get(testStoryUrl);
  };

  const isTextRendered = () =>
    browser.isElementPresent($('[data-hook="text-element"]'));

  const isEllipsisRendered = () =>
    browser.isElementPresent($('[data-hook="popover-element"]'));

  it('should have ellipsis', async () => {
    await navigateToTestUrl('with ellipsis');

    // Text element
    expect(isTextRendered()).toBe(true);

    // Ellipsis element
    await eventually(() => expect(isEllipsisRendered()).toBe(true));
  });

  it('should not have ellipsis', async () => {
    await navigateToTestUrl('without ellipsis');

    // Text element
    expect(isTextRendered()).toBe(true);

    // Ellipsis element
    expect(isEllipsisRendered()).toBe(false);
  });
});
