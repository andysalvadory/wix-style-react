import { baseUniDriverFactory, findByHook } from '../../test/utils/unidriver';

export const selectableAccordionDriverFactory = (base, body) => {
  return {
    ...baseUniDriverFactory(base, body),
  };
};
