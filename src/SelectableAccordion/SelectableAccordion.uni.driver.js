import {
  baseUniDriverFactory,
  findByHook,
  getDataAttributeValue,
} from '../../test/utils/unidriver';
import { dataHooks, dataAttr } from './constants';
import { getItemAt } from './utils';

export const selectableAccordionDriverFactory = (base, body) => {
  return {
    ...baseUniDriverFactory(base, body),

    clickItemAt: async idx => {
      const item = await getItemAt(base, idx);
      return findByHook(item, dataHooks.itemHeader).click();
    },

    isItemExpandedAt: async idx => {
      const item = await getItemAt(base, idx);
      const itemState = await getDataAttributeValue(item, dataAttr.STATE);

      return itemState === 'open';
    },
  };
};
