import { selectableAccordionDriverFactory as publicDriverFactory } from '../SelectableAccordion.uni.driver';
import { dataHooks } from '../constants';

const getItemAt = (idx, base) =>
  base.$$(`[data-hook="${dataHooks.item}"]`).get(idx);

export const selectableAccordionPrivateDriverFactory = (base, body) => {
  return {
    ...publicDriverFactory(base, body),

    getItemsCount: async () =>
      base.$$(`[data-hook="${dataHooks.item}"]`).count(),

    hoverOnItem: async idx =>
      await getItemAt(idx, base)
        .$(`[data-hook="${dataHooks.itemHeader}"]`)
        .hover(),
  };
};
