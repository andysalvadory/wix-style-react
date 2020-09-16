import React from 'react';
import { ThemeProviderContext } from './ThemeProviderContext.js';
import { defaultIcons } from './defaultIcons';

/** In the future, every theme including the default will require a <ThemeProvider/> on top.
 * This will assist in smaller bundle size for whoever would override the icons or other heavy assets */
export const ThemeProviderConsumerBackwardCompatible = props => (
  <ThemeProviderContext.Consumer>
    {context => {
      return context && context.icons ? (
        <ThemeProviderContext.Consumer {...props} />
      ) : (
        <ThemeProviderContext.Provider value={{ icons: defaultIcons }}>
          <ThemeProviderContext.Consumer {...props} />
        </ThemeProviderContext.Provider>
      );
    }}
  </ThemeProviderContext.Consumer>
);
