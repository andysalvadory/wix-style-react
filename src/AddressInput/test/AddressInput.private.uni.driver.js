import { addressInputDriverFactory as publicDriverFactory } from '../AddressInput.uni.driver';

export const addressInputPrivateDriverFactory = (base, body) => {
  return {
    ...publicDriverFactory(base, body),

    // Add here driver methods that considered "private"
  };
};
