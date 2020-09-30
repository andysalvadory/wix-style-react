import {
  baseUniDriverFactory,
  findByHookAtIndex,
  findByHook,
  getDataAttributeValue,
} from '../../test/utils/unidriver';
import { dataHooks, dataAttr } from './constants';

export const selectableAccordionDriverFactory = (base, body) => {
  return {
    ...baseUniDriverFactory(base, body),

    clickItemAt: async idx => {
      const item = await findByHookAtIndex(base, dataHooks.item, idx);
      return findByHook(item, dataHooks.itemHeader).click();
    },

    isItemExpandedAt: async idx => {
      const item = await findByHookAtIndex(base, dataHooks.item, idx);
      const itemState = await getDataAttributeValue(item, dataAttr.STATE);

      return itemState === 'open';
    },
  };
};
