import { selectableAccordionDriverFactory as publicDriverFactory } from '../SelectableAccordion.uni.driver';

export const selectableAccordionPrivateDriverFactory = (base, body) => {
  return {
    ...publicDriverFactory(base, body),

    // Add here driver methods that considered "private"
  };
};
