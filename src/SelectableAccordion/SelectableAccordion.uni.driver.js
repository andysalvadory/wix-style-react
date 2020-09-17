import {
  baseUniDriverFactory,
  findByHookAtIndex,
} from '../../test/utils/unidriver';
import { dataHooks } from './constants';

export const selectableAccordionDriverFactory = (base, body) => {
  return {
    ...baseUniDriverFactory(base, body),

    clickItemAt: idx =>
      findByHookAtIndex(base, dataHooks.item, idx)
        .$(`[data-hook="${dataHooks.itemHeader}"]`)
        .click(),

    isItemExpandedAt: async idx => {
      const value = await findByHookAtIndex(base, dataHooks.item, idx).attr(
        'data-state',
      );

      return value === 'open';
    },
  };
};
