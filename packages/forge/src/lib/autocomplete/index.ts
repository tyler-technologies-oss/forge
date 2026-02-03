import { defineCustomElement } from '@tylertech/forge-core';

import { AutocompleteComponent } from './autocomplete';

export * from './autocomplete-adapter';
export * from './autocomplete-component-delegate';
export * from './autocomplete-constants';
export * from './autocomplete-core';
export * from './autocomplete-utils';
export * from './autocomplete';

export function defineAutocompleteComponent(): void {
  defineCustomElement(AutocompleteComponent);
}
