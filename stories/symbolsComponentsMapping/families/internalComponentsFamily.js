import { internalComponentsSymbols } from '../symbols';
import { internalComponentsNames } from '../components';

/**
 * Symbol => Component IC
 */
export const internalComponentsSymbolsToComponents = {
  [internalComponentsSymbols.dropdownLayout]: [
    internalComponentsNames.DropdownLayout,
  ],

  [internalComponentsSymbols.tagList]: [internalComponentsNames.TagList],
  [internalComponentsSymbols.listItemAction]: [
    internalComponentsNames.ListItemAction,
  ],
  [internalComponentsSymbols.listItemEditable]: [
    internalComponentsNames.ListItemEditable,
  ],
  [internalComponentsSymbols.listItemSection]: [
    internalComponentsNames.ListItemSection,
  ],
  [internalComponentsSymbols.listItemSelect]: [
    internalComponentsNames.ListItemSelect,
  ],
};
