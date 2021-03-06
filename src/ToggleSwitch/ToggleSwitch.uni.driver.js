import { toggleSwitchUniDriverFactory as coreToggleSwitchUniDriverFactory } from 'wix-ui-core/dist/src/components/toggle-switch/ToggleSwitch.uni.driver';

export const toggleSwitchDriverFactory = base => {
  const coreToggleSwitchDriver = coreToggleSwitchUniDriverFactory(base);

  return {
    ...coreToggleSwitchDriver,

    /** Get Toggle Switch size */
    getSize: () => base.attr('data-size'),

    /** Get Toggle Switch skin */
    getSkin: () => base.attr('data-skin'),
  };
};
